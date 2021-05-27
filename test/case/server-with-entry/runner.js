const { YylHander, SERVER_PLUGIN_PATH } = require('../../../')
const SeedResponse = require('yyl-seed-response')
const YylCmdLogger = require('yyl-cmd-logger')
const path = require('path')
const testSeed = {
  name: 'testSeed',
  version: '0.1.0',
  path: __dirname,
  optimize: async ({ yylConfig, root, env, ctx }) => {
    const iRes = new SeedResponse()
    const opzer = {
      root,
      response: iRes,
      ignoreServer: true,
      getConfigSync() {
        return yylConfig
      },
      on(eventName, fn) {
        iRes.on(eventName, fn)
        return opzer
      },
      all() {
        setTimeout(() => {
          iRes.trigger('progress', ['finished', 'success', ['done']])
        }, 200)
        return opzer
      },
      watch() {
        setTimeout(() => {
          iRes.trigger('progress', ['finished', 'success', ['done']])
        }, 200)
        return opzer
      }
    }
    return opzer
  },
  initPlugins: {
    default: [],
    yy: []
  }
}

const logger = new YylCmdLogger()

async function watch() {
  const configPath = path.join(__dirname, 'yyl.config.ts')
  logger.setLogLevel(2)
  const yylHander = new YylHander({
    yylConfig: configPath,
    env: {
      proxy: true,
      logLevel: 2
    },
    logger(type, $1, $2, $3) {
      if (type === 'msg') {
        logger.log($1, $2)
      } else {
        logger.setProgress($1, $2, $3)
      }
    }
  })
  await yylHander.init({
    seed: testSeed,
    watch: true
  })
}

watch()
