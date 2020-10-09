const path = require('path')
const util = require('yyl-util')
const extOs = require('yyl-os')
const fs = require('fs')
const chalk = require('chalk')
const Opzer = require('./opzer')
const pkg = require('../package.json')
const LANG = require('../lang/index')

const SUGAR_REG = /(\{\$)([a-zA-Z0-9@_\-$.~]+)(\})/g
const USERPROFILE =
  process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']

class Hander {
  constructor({ log, vars }) {
    const self = this
    self.log = log
    self.vars = {
      // 本机ip
      LOCAL_SERVER: extOs.LOCAL_IP,

      // pkg 版本 用于 proxy useragent
      PKG_VERSION: pkg.version,

      // 是否 windows 系统
      IS_WINDOWS: process.platform == 'win32',

      // server 根目录
      SERVER_PATH: util.path.join(USERPROFILE, '.yyl'),

      // server 数据存放目录
      SERVER_DATA_PATH: util.path.join(USERPROFILE, '.yyl/data'),

      // server plugins 存放目录
      SERVER_PLUGIN_PATH: util.path.join(USERPROFILE, '.yyl/plugins'),

      // server proxy mapping 存放地址
      SERVER_PROXY_MAPPING_FILE: util.path.join(
        USERPROFILE,
        '.yyl/data/proxy-mapping.js'
      ),

      // server 存放构建生成的 config 的缓存文件
      SERVER_CONFIG_LOG_PATH: util.path.join(USERPROFILE, '.yyl/config-log'),

      // proxy 缓存目录
      PROXY_CACHE_PATH: util.path.join(USERPROFILE, '.anyproxy/cache'),

      // 项目路径
      PROJECT_PATH: ''
    }
    self.optimize = new Opzer({ log, extFn: this })
    self.setVars(vars)
  }
  setVars(op) {
    this.vars = Object.assign(this.vars, op)
    this.optimize.setVars(this.vars)
    return this.vars
  }
  hideProtocol(str) {
    if (typeof str === 'string') {
      return str.replace(/^http[s]?:/, '')
    } else {
      return str
    }
  }
  sugarReplace(str, alias) {
    return str.replace(SUGAR_REG, (str, $1, $2) => {
      if ($2 in alias) {
        return alias[$2]
      } else {
        return str
      }
    })
  }
  /** 格式化 config obj 为 yyl.config.js */
  formatConfig({ config = {}, env = {}, dirname = '', returnKeys }) {
    const self = this
    const { vars } = self
    let usefulKeys = []
    const isUseful = function (obj, ctx) {
      let keys = []
      if (typeof ctx === 'string') {
        keys.push(ctx)
      } else if (util.type(ctx) === 'array') {
        keys = ctx
      }
      if (!keys.length) {
        return true
      }
      let r = false
      if (typeof obj !== 'object') {
        return false
      }
      keys.forEach((key) => {
        if (key in obj) {
          r = true
        }
      })
      return r
    }
    const usefulCtx = returnKeys || 'workflow'

    if (!isUseful(config, usefulCtx)) {
      Object.keys(config).forEach((key) => {
        if (isUseful(config[key], usefulCtx)) {
          usefulKeys.push(key)
        }
      })
    }

    if (!env.name && usefulKeys.length) {
      throw new Error(`${LANG.MISS_NAME_OPTIONS}: ${usefulKeys.join('|')}`)
    } else if (env.name && usefulKeys.indexOf(env.name) === -1) {
      throw new Error(
        `${LANG.NAME_OPTIONS_NOT_EXISTS}: ${env.name}, usage: ${Object.keys(
          config
        ).join('|')}`
      )
    } else if (env.name && config[env.name]) {
      config = config[env.name]
    }

    if (env.workflow) {
      config.workflow = env.workflow
    }

    if (!isUseful(config, usefulCtx)) {
      let errMsg =
        util.type(usefulCtx) === 'array' ? usefulCtx.join(',') : usefulCtx
      throw new Error(`${LANG.CONFIG_ATTR_IS_NEEDFUL}: ${errMsg}`)
    }

    // webpackConfigPath format to absolute
    if (config.webpackConfigPath) {
      config.webpackConfigPath = util.path.resolve(
        dirname,
        config.webpackConfigPath
      )
    }

    // alias 相关检查
    if (!config.alias) {
      config.alias = {}
    }
    if (!config.alias.dirname) {
      config.alias.dirname = dirname
    }

    // 必要字段 alias.srcRoot
    if (!config.alias.srcRoot) {
      config.alias.srcRoot = ''
    }
    // 必要字段 alias.destRoot
    if (!config.alias.destRoot) {
      if (config.localserver && config.localserver.root) {
        config.alias.destRoot = config.localserver.root
      } else {
        config.alias.destRoot = ''
      }
    }

    // 选填字段
    ;[
      'imagesDest',
      'jsDest',
      'revDest',
      'jslibDest',
      'cssDest',
      'imagesDest',
      'htmlDest',
      'tplDest'
    ].some((key) => {
      if (!config.alias[key]) {
        config.alias[key] = config.alias.destRoot || config.alias.dirname
      }
    })

    // alias format to absolute
    Object.keys(config.alias).forEach((key) => {
      config.alias[key] = util.path.resolve(dirname, config.alias[key])
    })

    // 必要字段 2
    if (!config.commit || !config.commit.hostname) {
      if (!config.commit) {
        config.commit = {}
      }
      config.commit.hostname = '/'
    }

    // config.resource to absolute
    if (config.resource) {
      Object.keys(config.resource).forEach((key) => {
        let curKey = self.sugarReplace(key, config.alias)
        if (curKey === key) {
          curKey = util.path.resolve(dirname, key)
        }
        const curVal = config.resource[key]
        let rVal = self.sugarReplace(curVal, config.alias)
        if (rVal === curVal) {
          rVal = util.path.resolve(dirname, config.resource[key])
        }
        config.resource[curKey] = rVal
        delete config.resource[key]
      })
    }

    // 文件变量解析
    const deep = (obj) => {
      Object.keys(obj).forEach((key) => {
        const curKey = self.sugarReplace(key, config.alias)
        if (curKey !== key) {
          obj[curKey] = obj[key]
          delete obj[key]
        }

        switch (util.type(obj[curKey])) {
          case 'array':
            obj[curKey] = obj[curKey].map((val) => {
              if (util.type(val) === 'string') {
                return self.sugarReplace(val, config.alias)
              } else {
                return val
              }
            })
            deep(obj[curKey])
            break

          case 'object':
            deep(obj[curKey])
            break

          case 'string':
            obj[curKey] = self.sugarReplace(obj[curKey], config.alias)
            break

          case 'number':
            break

          default:
            break
        }
      })
    }

    new Array('concat', 'commit').forEach((key) => {
      if (util.type(config[key]) === 'object') {
        deep(config[key])
      }
    })

    // platform 相关检查
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('platform'))) {
      if (!config.platform) {
        config.platform = 'pc'
      }
    }

    // name 检查
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('platform'))) {
      if (!config.name) {
        config.name = 'any'
      }
    }

    // localserver
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('localserver'))) {
      if (config.localserver && config.localserver.root) {
        config.localserver.root = util.path.join(
          path.resolve(vars.PROJECT_PATH, config.localserver.root)
        )
      }
    }

    // 配置 resolveModule (适用于 webpack)
    if (
      !config.resolveModule &&
      config.workflow &&
      config.plugins &&
      config.plugins.length
    ) {
      config.resolveModule = util.path.join(
        vars.SERVER_PLUGIN_PATH,
        config.workflow,
        config.name,
        'node_modules'
      )
    }

    let r = {}
    if (returnKeys) {
      returnKeys.forEach((key) => {
        r[key] = config[key]
      })
    } else {
      r = config
    }
    return r
  }
  /** 解析 yyl.config.js */
  parseConfig(configPath, env = {}, returnKeys) {
    let config = {}
    let iConfig = {}
    if (!fs.existsSync(configPath)) {
      throw new Error(`${LANG.CONFIG_NOT_EXISTS}: ${chalk.yellow(configPath)}`)
    }

    const dirname = path.dirname(configPath)

    try {
      iConfig = util.requireJs(configPath)
      util.extend(true, config)
    } catch (er) {
      throw new Error(
        `${LANG.CONFIG_PARSE_ERROR}: ${configPath}, ${er.message}`
      )
    }

    if (typeof iConfig === 'function') {
      config = util.extend(true, config, iConfig({ env }))
    } else {
      config = util.extend(true, config, iConfig)
    }

    // extend config.mine.js
    let mineConfig = {}
    const mineConfigPath = configPath.replace(/\.js$/, '.mine.js')

    if (fs.existsSync(mineConfigPath)) {
      try {
        mineConfig = util.requireJs(mineConfigPath)
      } catch (er) {}
    }

    if (typeof mineConfig === 'function') {
      mineConfig = mineConfig({ env })
    }

    util.extend(true, config, mineConfig)
    return Promise.resolve(
      this.formatConfig({
        config,
        env,
        dirname,
        returnKeys
      })
    )
  }
}

module.exports = Hander
