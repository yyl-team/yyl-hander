const path = require('path')
const util = require('yyl-util')
const fs = require('fs')
const extFs = require('yyl-fs')
const extOs = require('yyl-os')
const chalk = require('chalk')
const request = require('yyl-request')
const { runSpawn } = require('yyl-os')
const LANG = require('../lang/index')

class Opzer {
  constructor({ log, extFn, vars }) {
    this.log = log
    this.extFn = extFn
    this.config = null
    this.iEnv = {}
    this.vars = vars
  }
  setVars(vars) {
    this.vars = vars
  }
  init({ config, iEnv }) {
    this.config = config
    this.iEnv = iEnv
  }
  async initPlugins() {
    const { config } = this
    let pluginPath = null
    if (config.resolveModule) {
      pluginPath = path.join(config.resolveModule, '..')
      if (!fs.existsSync(pluginPath)) {
        extFs.mkdirSync(pluginPath)
      }
    }
    return await extOs.installNodeModules(
      config.plugins,
      pluginPath,
      !!config.yarn
    )
  }
  /** scripts 执行 */
  async initScripts(ctx) {
    const { vars, config, iEnv, log } = this
    if (typeof ctx === 'string') {
      log('msg', 'cmd', ctx)
      return await runSpawn(ctx, vars.PROJECT_PATH)
    } else if (typeof ctx === 'function') {
      log('msg', 'info', LANG.RUN_SCRIPT_FN_START)
      const rFn = ctx({ config, env: iEnv })
      if (typeof rFn === 'string') {
        log('msg', 'cmd', rFn)
        return await runSpawn(rFn, vars.PROJECT_PATH)
      } else {
        const r = await rFn
        log('msg', 'success', LANG.RUN_SCRIPT_FN_FINISHED)
        return r
      }
    } else {
      return
    }
  }
  /** 初始化 执行前 script */
  async initBeforeScripts(ctx) {
    const { config, log } = this
    let entry = config.all
    const IS_WATCH = ctx === 'watch'
    if (IS_WATCH) {
      entry = config.watch
    }
    if (entry && entry.beforeScripts) {
      log(
        'msg',
        'info',
        IS_WATCH
          ? LANG.RUN_WATCH_BEFORE_SCRIPT_START
          : LANG.RUN_ALL_BEFORE_SCRIPT_START
      )
      const r = await this.initScripts(entry.beforeScripts)
      log(
        'msg',
        'success',
        IS_WATCH
          ? LANG.RUN_WATCH_BEFORE_SCRIPT_FINISHED
          : LANG.RUN_ALL_BEFORE_SCRIPT_FINISHED
      )
      return r
    }
  }

  /** 初始化 执行后 script */
  async initAfterScripts(ctx) {
    const { config, log } = this
    let entry = config.all
    const IS_WATCH = ctx === 'watch'
    if (IS_WATCH) {
      entry = config.watch
    }
    if (entry && entry.afterScripts) {
      log(
        'msg',
        'info',
        IS_WATCH
          ? LANG.RUN_WATCH_AFTER_SCRIPT_START
          : LANG.RUN_ALL_AFTER_SCRIPT_START
      )
      const r = await this.initScripts(entry.afterScripts)
      log(
        'msg',
        'success',
        IS_WATCH
          ? LANG.RUN_WATCH_AFTER_SCRIPT_FINISHED
          : LANG.RUN_ALL_AFTER_SCRIPT_FINISHED
      )
      return r
    }
  }

  async getHomePage(op) {
    const { vars, config, iEnv } = this
    const files = op && op.files
    const sortHtmls = function (htmls) {
      htmls.sort((a, b) => {
        const aName = path.basename(a)
        const bName = path.basename(b)
        const reg = /^index|default$/
        const aReg = reg.exec(aName)
        const bReg = reg.exec(bName)

        if (aReg && !bReg) {
          return -1
        } else if (!aReg && bReg) {
          return 1
        } else {
          return a.localeCompare(b)
        }
      })
    }

    let addr
    let localServerAddr = ''
    let localServerAddr2 = ''
    if (config.localserver && config.localserver.port) {
      localServerAddr = `http://${vars.LOCAL_SERVER}:${config.localserver.port}`
      localServerAddr2 = `http://127.0.0.1:${config.localserver.port}`
    }
    const iHost = config.commit.hostname.replace(/\/$/, '')

    if (config.proxy && config.proxy.homePage && iEnv.proxy) {
      addr = config.proxy.homePage
    } else {
      let htmls = []
      if (files && files.length) {
        htmls = files
      } else {
        htmls = await extFs.readFilePaths(
          config.alias.destRoot,
          /\.html$/,
          true
        )
      }
      sortHtmls(htmls)

      if (iEnv.proxy) {
        let iAddr = ''
        if (config.proxy && config.proxy.localRemote) {
          for (let key in config.proxy.localRemote) {
            iAddr = config.proxy.localRemote[key].replace(/\/$/, '')
            if (
              (iAddr === localServerAddr || iAddr === localServerAddr2) &&
              key.replace(/\/$/, '') !== iHost
            ) {
              addr = key
              break
            }
          }
        }
        if (!addr) {
          addr = config.commit.hostname
        }
      } else {
        addr = localServerAddr
      }

      if (htmls.length) {
        addr = util.path.join(
          addr,
          path.relative(config.alias.destRoot, htmls[0])
        )
      }
    }
    return addr
  }

  async openHomePage(op) {
    const { log } = this
    const addr = await this.getHomePage(op)

    log('msg', 'success', LANG.OPEN_ADDR)
    log('msg', 'success', chalk.cyan(addr))
    await extOs.openBrowser(addr)
    return addr
  }
  async livereload() {
    const { config, vars } = this
    if (config.localserver && config.localserver.port) {
      const reloadPath = `http://${vars.LOCAL_SERVER}:${config.localserver.port}1/changed?files=1`
      try {
        await request(reloadPath)
      } catch (er) {}
    }
  }
  async saveConfigToServer() {
    const { log, vars, config } = this

    if (!config || !config.workflow || !config.name) {
      return
    }
    await extFs.mkdirSync(vars.SERVER_CONFIG_LOG_PATH)
    const filename = `${config.workflow}-${config.name}.js`
    const serverConfigPath = path.join(vars.SERVER_CONFIG_LOG_PATH, filename)
    const printPath = `~/.yyl/${path.relative(
      vars.SERVER_PATH,
      serverConfigPath
    )}`
    fs.writeFileSync(serverConfigPath, JSON.stringify(config, null, 2))
    log('msg', 'success', `${LANG.CONFIG_SAVED}: ${chalk.yellow(printPath)}`)
  }
}

module.exports = Opzer
