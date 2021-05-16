import fs from 'fs'
import path from 'path'
import { YylConfig, Env, YylConfigAlias, YylConfigEntry, Logger } from 'yyl-config-types'
import { deepReplace, formatPath, needEnvName, toCtx, sugarReplace } from './util'
import extOs, { runSpawn } from 'yyl-os'
import util, { type } from 'yyl-util'
import extFs from 'yyl-fs'
import chalk from 'chalk'
import { LANG, SERVER_PLUGIN_PATH, SERVER_CONFIG_LOG_PATH, SERVER_PATH } from './const'
import request from 'request'
import { SeedEntry, SeedOptimizeResult } from 'yyl-seed-base'
import { Runner, YServerSetting } from 'yyl-server'
import { tsParser } from 'node-ts-parser'
export { tsParser, TsParserOption } from 'node-ts-parser'

/** 格式化配置 - 配置 */
export interface FormatConfigOption {
  yylConfig: YylConfig
  env: Env
  context: string
}
/** 获取 homepage - 配置 */
export interface GetHomePageOption {
  files?: string[]
}

/** yyl.config 解析 - 配置 */
export interface ParseConfigOption {
  configPath: string
  env: Env
}

export interface YylParserOption {
  yylConfig?: YylConfig | string
  env?: Env
  logger?: Logger
  context?: string
}

/** 启动服务器 - 配置 */
export interface StartServerOption extends YylParserOption {
  opzer?: SeedOptimizeResult
}

export interface YylHanderInitOption {
  /** seed 包 */
  seed: SeedEntry
  /** 是否执行 watch */
  watch?: boolean
  /** yyl 版本 - 用于与 yylConfig.version 进行比较 */
  yylVersion?: string
}

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
  seed: SeedEntry | undefined = undefined
  logger: Logger = () => {}
  runner?: Runner

  /** 解析配置 */
  static parseConfig(op: ParseConfigOption) {
    const { configPath, env } = op
    let yylConfig: YylConfigEntry = {}
    if (!fs.existsSync(configPath)) {
      throw new Error(`${LANG.CONFIG_NOT_EXISTS}: ${chalk.yellow(configPath)}`)
    }
    const context = path.dirname(configPath)

    if (path.extname(configPath) === '.ts') {
      // ts 解析
      const rs = tsParser<YylConfigEntry>({ file: configPath, context })
      if (rs[0]) {
        throw rs[0]
      }
      if (rs[1]) {
        yylConfig = rs[1]
      }
    } else {
      // js 解析
      try {
        yylConfig = require(configPath)
      } catch (er) {
        throw new Error(`${LANG.CONFIG_PARSE_ERROR}: ${configPath}, ${er.message}`)
      }
    }

    if (typeof yylConfig === 'function') {
      yylConfig = yylConfig({ env })
    }

    // extend config.mine.js
    let mineConfig: YylConfigEntry = {}
    if (path.extname(configPath) === '.ts') {
      const mineConfigPath = configPath.replace(/\.ts$/, '.mine.ts')
      if (fs.existsSync(mineConfigPath)) {
        const [err, result] = tsParser<YylConfigEntry>({ context, file: mineConfigPath })
        if (result) {
          mineConfig = result
        }
      }
    } else {
      const mineConfigPath = configPath.replace(/\.js$/, '.mine.js')
      if (fs.existsSync(mineConfigPath)) {
        try {
          mineConfig = require(mineConfigPath)
        } catch (er) {}
      }
    }
    if (typeof mineConfig === 'function') {
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

  /** 格式化配置 */
  static formatConfig(option: FormatConfigOption): YylConfig {
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

  /** 启动服务器 */
  static async startServer(op: StartServerOption) {
    let { yylConfig, env, logger, context, opzer } = op

    if (typeof yylConfig === 'string') {
      context = path.dirname(yylConfig)
      yylConfig = YylHander.parseConfig({
        configPath: yylConfig,
        env: env || {}
      })
    }

    if (!logger) {
      logger = () => {}
    }

    logger('msg', 'info', [`${LANG.RUNNER_START}`])
    const runner = new Runner({
      logger,
      yylConfig,
      env,
      cwd: context,
      ignoreServer: !!opzer?.ignoreServer,
      serverOption: (() => {
        const r: YServerSetting = {}
        if (opzer?.appWillMount) {
          r.appDidMount = opzer.appWillMount
        }

        if (opzer?.appDidMount) {
          r.appDidMount = opzer.appDidMount
        }
        return r
      })()
    })

    try {
      await runner.start()
      logger('msg', 'success', [`${LANG.RUNNER_START_FINISHED}`])
    } catch (er) {
      logger('msg', 'error', [`${LANG.RUNNER_START_FAIL}`, er])
    }

    return runner
  }

  constructor(option: YylParserOption) {
    let { yylConfig, env, logger, context } = option
    if (logger) {
      this.logger = logger
    }
    if (env) {
      this.env = env
    }
    if (context) {
      this.context = context
    }

    // 寻找 context 下 yyl.config
    if (!yylConfig && !this.env.config) {
      const yylConfigTsPath = path.join(this.context, 'yyl.config.ts')
      const yylConfigPath = path.join(this.context, 'yyl.config.js')
      const yylConfigLegacyPath = path.join(this.context, 'config.js')
      if (fs.existsSync(yylConfigTsPath)) {
        yylConfig = yylConfigTsPath
      } else if (fs.existsSync(yylConfigPath)) {
        yylConfig = yylConfigPath
      } else if (fs.existsSync(yylConfigLegacyPath)) {
        yylConfig = yylConfigLegacyPath
      } else {
        throw new Error(`${LANG.CONFIG_NOT_EXISTS}: yy.config.ts / yyl.config.js / config.js`)
      }
    }

    if (this.env.config) {
      const configPath = path.resolve(process.cwd(), this.env.config)
      this.context = path.dirname(configPath)
      this.yylConfig = YylHander.parseConfig({
        configPath,
        env: this.env
      })
    } else if (typeof yylConfig === 'string') {
      this.context = path.dirname(yylConfig)
      this.yylConfig = YylHander.parseConfig({
        configPath: yylConfig,
        env: this.env
      })
    } else if (yylConfig) {
      this.yylConfig = YylHander.formatConfig({ yylConfig, env: this.env, context: this.context })
    } else {
      throw new Error(`${LANG.CONFIG_NOT_EXISTS}`)
    }
  }

  /** 初始化 */
  async init(op: YylHanderInitOption) {
    const { seed, watch, yylVersion } = op
    const { yylConfig, context, logger, env } = this

    // 版本检查
    if (yylVersion && yylConfig.version) {
      if (util.compareVersion(yylConfig.version, yylVersion) > 0) {
        logger('msg', 'error', [new Error(`${LANG.REQUIRE_ATLEAST_VERSION}: ${yylConfig.version}`)])
        return
      }
    }

    // yarn 安装检查
    if (yylConfig.yarn) {
      const yarnVersion = await extOs.getYarnVersion()
      if (yarnVersion) {
        logger('msg', 'info', [`${LANG.YARN_VERSION}: ${chalk.green(yarnVersion)}`])

        // 删除 package-lock.json
        const pkgLockPath = path.join(context, 'package-lock.json')
        if (fs.existsSync(pkgLockPath)) {
          await extFs.removeFiles(pkgLockPath).catch(() => undefined)
          logger('msg', 'warn', [LANG.DEL_PKG_LOCK_FILE])
        }
      } else {
        logger('msg', 'error', [
          new Error(`${LANG.INSTALL_YARN}: ${chalk.yellow('npm i yarn -g')}`)
        ])
        return
      }
    }

    if (!seed) {
      logger('msg', 'error', [new Error(LANG.SEED_NOT_SET)])
      return
    }

    // config.plugins 插件初始化
    try {
      await this.initPlugins((installMsgBuffer) => {
        const strs = installMsgBuffer.toString().split(/[\r\n]+/)
        strs.forEach((str) => {
          logger('msg', 'info', [str])
        })
      })
    } catch (er) {
      logger('msg', 'error', [er])
    }

    // 保存配置到服务器
    try {
      this.saveConfigToServer()
    } catch (er) {
      logger('msg', 'error', [new Error(LANG.SAVE_CONFIG_TO_SERVER_FAIL)])
    }

    // clean dist
    if (
      yylConfig.localserver?.root &&
      path.join(yylConfig.localserver.root) !== path.join(context)
    ) {
      await extFs.removeFiles(yylConfig.localserver?.root).catch(() => {
        logger('msg', 'warn', [
          `${LANG.CLEAN_DIST_FAIL}: ${chalk.yellow(yylConfig.localserver?.root)}`
        ])
      })
      logger('msg', 'success', [
        `${LANG.CLEAN_DIST_FINISHED}: ${chalk.yellow(yylConfig.localserver?.root)}`
      ])
    }

    // 执行代码前配置项
    await this.runBeforeScripts().catch((er) => {
      logger('msg', 'error', [er])
    })

    try {
      logger('msg', 'info', [`${LANG.SEED_INIT_START}`])
      const opzer = await seed.optimize({
        yylConfig,
        env,
        ctx: watch ? 'watch' : 'all',
        root: context
      })
      logger('msg', 'info', [`${LANG.SEED_INIT_FINISHED}`])

      // 启动本地 server
      if (watch && opzer) {
        this.runner = await YylHander.startServer({
          context: this.context,
          yylConfig,
          env,
          opzer,
          logger
        })
      }

      return await new Promise<[YylConfig, SeedOptimizeResult | undefined]>((resolve, reject) => {
        if (opzer) {
          let isUpdate = false
          let isError: false | Error = false
          const htmlSet: Set<string> = new Set()
          logger('msg', 'info', [LANG.OPTIMIZE_START])
          opzer
            .on('msg', (type, args) => {
              if (type === 'error') {
                isError = toCtx<Error>(args[0])
              }
              if (['create', 'update', 'add'].includes(type)) {
                if (/\.html$/.test(args[0])) {
                  htmlSet.add(args[0])
                }
              }
              logger('msg', type, args)
            })
            .on('progress', async (type, infoType, args) => {
              if (type === 'start') {
                logger('progress', 'start', infoType, args)
              } else if (type === 'finished' || type === 'forceFinished') {
                if (!watch && isError) {
                  logger('msg', 'error', [isError])
                  logger('progress', type, infoType, args)
                  return
                }

                /** 执行代码执行后配置项 */
                this.runAfterScripts(watch)
                logger('msg', 'success', [`${watch ? 'watch' : 'all'} ${LANG.OPTIMIZE_FINISHED}`])

                if (watch) {
                  const homePage = await this.getHomePage({
                    files: (() => {
                      const r: string[] = []
                      htmlSet.forEach((item) => {
                        r.push(item)
                      })
                      return r
                    })()
                  })

                  logger('msg', 'success', [
                    `${LANG.PRINT_HOME_PAGE}: ${chalk.yellow.bold(homePage)}`
                  ])

                  // 第一次构建 打开 对应页面
                  if (!isUpdate && !env.silent && homePage && env.open) {
                    extOs.openBrowser(homePage)
                  }
                }

                if (isUpdate) {
                  if (env.livereload) {
                    logger('msg', 'success', [LANG.PAGE_RELOAD])
                    await this.livereload()
                  }
                  logger('progress', type, infoType, args)
                } else {
                  isUpdate = true
                  logger('progress', type, infoType, args)
                  resolve([yylConfig, opzer])
                }
              } else {
                logger('progress', type, infoType, args)
              }
            })
          if (watch) {
            opzer.watch()
          } else {
            opzer.all()
          }
        } else {
          logger('msg', 'error', [new Error(LANG.NO_OPZER_HANDLE)])
          resolve([yylConfig, opzer])
        }
      })
    } catch (er) {
      logger('msg', 'error', [new Error(LANG.SEED_INIT_FAIL), er])
      logger('progress', 'finished')
    }
  }

  /** 获取 yylConfig 内容 */
  getYylConfig() {
    return this.yylConfig
  }

  /** 解析 yylConfig.plugins 内容 */
  async initPlugins(cb: (msg: Buffer) => any) {
    const { yylConfig } = this
    let pluginPath = null
    if (yylConfig.resolveModule) {
      pluginPath = path.join(yylConfig.resolveModule, '..')
      if (!fs.existsSync(pluginPath)) {
        extFs.mkdirSync(pluginPath)
      }
    }
    if (yylConfig.plugins && pluginPath) {
      return await extOs.installNodeModules(yylConfig.plugins, pluginPath, !!yylConfig.yarn, cb)
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
          if (!yylConfig.commit?.hostname || yylConfig.commit?.hostname === '/') {
            addr = localServerAddr
          } else {
            addr = yylConfig.commit?.hostname
          }
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
      logger('msg', 'success', [LANG.OPEN_ADDR])
      logger('msg', 'success', [chalk.cyan(addr)])
      await extOs.openBrowser(addr)
    }

    return addr
  }

  /** scripts 执行 */
  async initScripts(ctx: any) {
    const { yylConfig, env, logger, context } = this
    if (typeof ctx === 'string') {
      logger('msg', 'cmd', [ctx])
      return await runSpawn(ctx, context, (dataBuffer) => {
        logger('msg', 'info', dataBuffer.toString().split(/[\r\n]+/))
      })
    } else if (typeof ctx === 'function') {
      logger('msg', 'info', [LANG.RUN_SCRIPT_FN_START])
      const rFn = ctx({ config: yylConfig, env, logger })
      if (typeof rFn === 'string') {
        logger('msg', 'cmd', [rFn])
        return await runSpawn(rFn, context, (dataBuffer) => {
          logger('msg', 'info', dataBuffer.toString().split(/[\r\n]+/))
        })
      } else {
        const r = await rFn
        logger('msg', 'success', [LANG.RUN_SCRIPT_FN_FINISHED])
        return r
      }
    }
  }

  /** 执行 before script */
  async runBeforeScripts(watch?: boolean) {
    const { yylConfig, logger } = this
    let entry = yylConfig.all
    if (watch) {
      entry = yylConfig.watch
    }
    if (entry && entry.beforeScripts) {
      logger('msg', 'info', [
        watch ? LANG.RUN_WATCH_BEFORE_SCRIPT_START : LANG.RUN_ALL_BEFORE_SCRIPT_START
      ])
      const r = await this.initScripts(entry.beforeScripts)
      logger('msg', 'success', [
        watch ? LANG.RUN_WATCH_BEFORE_SCRIPT_FINISHED : LANG.RUN_ALL_BEFORE_SCRIPT_FINISHED
      ])
      return r
    }
  }

  /** 执行 after script */
  async runAfterScripts(watch?: boolean) {
    const { yylConfig, logger } = this
    let entry = yylConfig.all
    if (watch) {
      entry = yylConfig.watch
    }
    if (entry && entry.afterScripts) {
      logger('msg', 'info', [
        watch ? LANG.RUN_WATCH_AFTER_SCRIPT_START : LANG.RUN_ALL_AFTER_SCRIPT_START
      ])
      const r = await this.initScripts(entry.afterScripts)
      logger('msg', 'success', [
        watch ? LANG.RUN_WATCH_AFTER_SCRIPT_FINISHED : LANG.RUN_ALL_AFTER_SCRIPT_FINISHED
      ])
      return r
    }
  }

  /** 热更新 */
  async livereload() {
    const { yylConfig } = this
    if (yylConfig.localserver?.port) {
      const reloadPath = `http://${extOs.LOCAL_IP}:${yylConfig.localserver.port}1/changed?files=1`
      try {
        await new Promise((resolve) => {
          request(reloadPath, undefined, () => {
            resolve(undefined)
          })
        })
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
    logger('msg', 'success', [`${LANG.CONFIG_SAVED}: ${chalk.yellow(printPath)}`])
  }
}
