import { YylConfig, Env, YylConfigAlias } from 'yyl-config-types'
import { deepReplace, formatPath, needEnvName, toCtx, sugarReplace } from './util'
import extOs, { runSpawn } from 'yyl-os'
import util, { type, requireJs } from 'yyl-util'
import extFs from 'yyl-fs'
import fs from 'fs'
import chalk from 'chalk'
import { LANG, SERVER_PLUGIN_PATH, SERVER_CONFIG_LOG_PATH, SERVER_PATH } from './const'
import request from 'request-promise'
import path from 'path'
export interface YylParserOption {
  yylConfig: YylConfig | string
  env?: Env
  logger?: Logger
  context?: string
}

export interface FormatConfigOption {
  yylConfig: YylConfig
  env: Env
  context: string
}
export interface GetHomePageOption {
  files?: string[]
}

export interface ParseConfigOption {
  configPath: string
  env: Env
}

export type Logger = (type: LoggerType, subType: LoggerSubType, ...args: any[]) => void
export type LoggerType = 'msg'
export type LoggerSubType = 'info' | 'success' | 'warn' | 'error' | 'cmd'

export const DEFAULT_ALIAS: YylConfigAlias = {
  root: './dist',
  srcRoot: './src',
  destRoot: './dist',
  dirname: './',
  jsDest: './dist/js',
  cssDest: './dist/css',
  imagesDest: './dist/images',
  htmlDest: './dist/html',
  revDest: './dist/assets',
  revRoot: './dist'
}

export class YylHander {
  context: string = process.cwd()
  yylConfig: YylConfig = {}
  env: Env = {}
  logger: Logger = () => undefined
  constructor(option: YylParserOption) {
    const { yylConfig, env, logger, context } = option
    if (logger) {
      this.logger = logger
    }
    if (env) {
      this.env = env
    }
    if (context) {
      this.context = context
    }
    if (typeof yylConfig === 'string') {
      this.context = path.dirname(yylConfig)
      this.yylConfig = this.parseConfig({
        configPath: yylConfig,
        env: this.env
      })
    } else {
      this.yylConfig = this.formatConfig({ yylConfig, env: this.env, context: this.context })
    }
  }

  parseConfig(op: ParseConfigOption) {
    const { configPath, env } = op
    let yylConfig: any = {}
    if (!fs.existsSync(configPath)) {
      throw new Error(`${LANG.CONFIG_NOT_EXISTS}: ${chalk.yellow(configPath)}`)
    }
    const context = path.dirname(configPath)

    try {
      yylConfig = require(configPath)
    } catch (er) {
      throw new Error(`${LANG.CONFIG_PARSE_ERROR}: ${configPath}, ${er.message}`)
    }

    if (typeof yylConfig === 'function') {
      yylConfig = yylConfig({ env })
    }

    // extend config.mine.js
    let mineConfig: any = {}
    const mineConfigPath = configPath.replace(/\.js$/, '.mine.js')
    if (fs.existsSync(mineConfigPath)) {
      try {
        mineConfig = require(mineConfigPath)
      } catch (er) {}
    }

    if (typeof mineConfigPath === 'function') {
      mineConfig = mineConfig({ env })
    }

    // deep extends
    util.extend(true, yylConfig, mineConfig)

    return this.formatConfig({
      context,
      yylConfig,
      env
    })
  }

  formatConfig(option: FormatConfigOption): YylConfig {
    let { yylConfig, env, context } = option

    // 检查是否需要 env.name
    const requiredNames = needEnvName(yylConfig)
    if (requiredNames.length) {
      if (env.name) {
        if (requiredNames.includes(env.name)) {
          yylConfig = toCtx(yylConfig)[env.name] as YylConfig
        } else {
          throw new Error(
            `${LANG.NAME_OPTIONS_NOT_EXISTS}: ${env.name}, usage: ${requiredNames.join('|')}`
          )
        }
      } else {
        throw new Error(`${LANG.MISS_NAME_OPTIONS}: ${requiredNames.join('|')}`)
      }
    }

    if (env.workflow) {
      yylConfig.workflow = env.workflow
    }
    if (!yylConfig.workflow) {
      throw new Error(`${LANG.CONFIG_ATTR_IS_NEEDFUL}: workflow`)
    }

    if (!yylConfig.name) {
      yylConfig.name = 'default'
    }

    // yylConfig 初始化
    yylConfig.alias = {
      ...DEFAULT_ALIAS,
      ...yylConfig.alias
    }

    // alias format to absolute
    Object.keys(yylConfig.alias).forEach((key: keyof YylConfigAlias) => {
      if (yylConfig.alias && yylConfig.alias[key]) {
        yylConfig.alias[key] = formatPath(path.resolve(context, yylConfig.alias[key]))
      }
    })

    // commit
    if (!yylConfig.commit?.hostname) {
      if (!yylConfig.commit) {
        yylConfig.commit = {
          revAddr: '',
          hostname: '/'
        }
      } else {
        yylConfig.commit.hostname = '/'
      }
    }

    if (yylConfig.webpackConfigPath) {
      yylConfig.webpackConfigPath = util.path.resolve(context, yylConfig.webpackConfigPath)
    }

    // config.resource to absolute
    if (yylConfig.resource) {
      Object.keys(yylConfig.resource).forEach((key) => {
        let curKey = sugarReplace(key, yylConfig.alias)
        if (curKey === key) {
          curKey = formatPath(path.resolve(context, key))
        }
        if (yylConfig.resource) {
          const curVal = yylConfig.resource[key]
          let rVal = sugarReplace(curVal, yylConfig.alias)
          if (rVal === curVal) {
            rVal = formatPath(path.resolve(context, yylConfig.resource[key]))
          }
          yylConfig.resource[curKey] = rVal
          delete yylConfig.resource[key]
        }
      })
    }
    if (type(yylConfig.concat) === 'object') {
      if (yylConfig.concat) {
        deepReplace(yylConfig.concat, yylConfig.alias)
      }
    }

    if (!yylConfig.platform) {
      yylConfig.platform = 'pc'
    }

    if (yylConfig?.localserver?.root) {
      yylConfig.localserver.root = formatPath(path.resolve(context, yylConfig.localserver.root))
    }

    // 配置 resolveModule (适用于 webpack)
    if (!yylConfig.resolveModule && yylConfig.workflow && yylConfig.plugins?.length) {
      yylConfig.resolveModule = formatPath(
        path.join(SERVER_PLUGIN_PATH, yylConfig.workflow, yylConfig.name, 'node_modules')
      )
    }
    return yylConfig
  }

  /** 获取 yylConfig 内容 */
  getYylConfig() {
    return this.yylConfig
  }

  /** 解析 yylConfig.plugins 内容 */
  async initPlugins() {
    const { yylConfig } = this
    let pluginPath = null
    if (yylConfig.resolveModule) {
      pluginPath = path.join(yylConfig.resolveModule, '..')
      if (!fs.existsSync(pluginPath)) {
        extFs.mkdirSync(pluginPath)
      }
    }
    if (yylConfig.plugins && pluginPath) {
      return await extOs.installNodeModules(yylConfig.plugins, pluginPath, !!yylConfig.yarn)
    }
  }

  /** 获取 homePage */
  async getHomePage(op?: GetHomePageOption) {
    const { yylConfig, env } = this
    const files = op?.files || []
    const sortHtmls = function (htmls: string[]) {
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
    if (yylConfig?.localserver?.port) {
      localServerAddr = `http://${extOs.LOCAL_IP}:${yylConfig.localserver.port}`
      localServerAddr2 = `http://127.0.0.1:${yylConfig.localserver.port}`
    }
    const iHost = yylConfig?.commit?.hostname.replace(/\/$/, '')

    if (yylConfig.proxy?.homePage && env.proxy) {
      addr = yylConfig.proxy.homePage
    } else {
      let htmls: string[] = []
      if (files && files.length) {
        htmls = files
      } else {
        if (yylConfig.alias) {
          htmls = await extFs.readFilePaths(yylConfig.alias?.destRoot, /\.html$/, true)
        }
      }
      sortHtmls(htmls)

      if (env.proxy) {
        let iAddr = ''
        if (yylConfig.proxy?.localRemote) {
          for (const key in yylConfig.proxy.localRemote) {
            iAddr = yylConfig.proxy.localRemote[key].replace(/\/$/, '')
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
          addr = yylConfig.commit?.hostname
        }
      } else {
        addr = localServerAddr
      }

      if (htmls.length) {
        if (yylConfig.alias && addr) {
          addr = util.path.join(addr, path.relative(yylConfig.alias?.destRoot, htmls[0]))
        }
      }
    }
    return addr
  }

  /** 打开 homePage */
  async openHomePage(op: GetHomePageOption) {
    const { logger } = this
    const addr = await this.getHomePage(op)

    if (addr) {
      logger('msg', 'success', LANG.OPEN_ADDR)
      logger('msg', 'success', chalk.cyan(addr))
      await extOs.openBrowser(addr)
    }

    return addr
  }

  /** scripts 执行 */
  async initScripts(ctx: any) {
    const { yylConfig, env, logger, context } = this
    if (typeof ctx === 'string') {
      logger('msg', 'cmd', ctx)
      return await runSpawn(ctx, context)
    } else if (typeof ctx === 'function') {
      logger('msg', 'info', LANG.RUN_SCRIPT_FN_START)
      const rFn = ctx({ config: yylConfig, env })
      if (typeof rFn === 'string') {
        logger('msg', 'cmd', rFn)
        return await runSpawn(rFn, context)
      } else {
        const r = await rFn
        logger('msg', 'success', LANG.RUN_SCRIPT_FN_FINISHED)
        return r
      }
    }
  }

  /** 执行 before script */
  async runBeforeScripts(ctx: string) {
    const { yylConfig, logger } = this
    let entry = yylConfig.all
    const IS_WATCH = ctx === 'watch'
    if (IS_WATCH) {
      entry = yylConfig.watch
    }
    if (entry && entry.beforeScripts) {
      logger(
        'msg',
        'info',
        IS_WATCH ? LANG.RUN_WATCH_BEFORE_SCRIPT_START : LANG.RUN_ALL_BEFORE_SCRIPT_START
      )
      const r = await this.initScripts(entry.beforeScripts)
      logger(
        'msg',
        'success',
        IS_WATCH ? LANG.RUN_WATCH_BEFORE_SCRIPT_FINISHED : LANG.RUN_ALL_BEFORE_SCRIPT_FINISHED
      )
      return r
    }
  }

  /** 执行 after script */
  async runAfterScripts(ctx: string) {
    const { yylConfig, logger } = this
    let entry = yylConfig.all
    const IS_WATCH = ctx === 'watch'
    if (IS_WATCH) {
      entry = yylConfig.watch
    }
    if (entry && entry.afterScripts) {
      logger(
        'msg',
        'info',
        IS_WATCH ? LANG.RUN_WATCH_AFTER_SCRIPT_START : LANG.RUN_ALL_AFTER_SCRIPT_START
      )
      const r = await this.initScripts(entry.afterScripts)
      logger(
        'msg',
        'success',
        IS_WATCH ? LANG.RUN_WATCH_AFTER_SCRIPT_FINISHED : LANG.RUN_ALL_AFTER_SCRIPT_FINISHED
      )
      return r
    }
  }

  /** 热更新 */
  async livereload() {
    const { yylConfig } = this
    if (yylConfig.localserver?.port) {
      const reloadPath = `http://${extOs.LOCAL_IP}:${yylConfig.localserver.port}1/changed?files=1`
      try {
        await request(reloadPath)
      } catch (er) {}
    }
  }

  /** 保存配置到缓存目录 */
  async saveConfigToServer() {
    const { logger, yylConfig } = this

    if (!yylConfig.workflow || !yylConfig.name) {
      return
    }
    await extFs.mkdirSync(SERVER_CONFIG_LOG_PATH)
    const filename = `${yylConfig.workflow}-${yylConfig.name}.js`
    const serverConfigPath = path.join(SERVER_CONFIG_LOG_PATH, filename)
    const printPath = `~/.yyl/${path.relative(SERVER_PATH, serverConfigPath)}`
    fs.writeFileSync(serverConfigPath, JSON.stringify(yylConfig, null, 2))
    logger('msg', 'success', `${LANG.CONFIG_SAVED}: ${chalk.yellow(printPath)}`)
  }
}
