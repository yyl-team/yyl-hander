const util = require('yyl-util')
const path = require('path')
const { YylHander } = require('../../output')
const {} = require('yyl-seed-base')
const SeedResponse = require('yyl-seed-response')
const configDir = util.path.join(__dirname, '../case/case-parse-config')

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
        iRes.trigger('progress', ['start'])
        setTimeout(() => {
          iRes.trigger('progress', ['finished', 'success', ['done']])
        }, 200)
        return opzer
      },
      watch() {
        iRes.trigger('progress', ['start'])
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

test('yylHander.init', async () => {
  const configPath = path.join(configDir, 'yyl.config-init.js')
  const loggerTypeResults = []
  const loggerOris = []
  const yylHander = new YylHander({
    yylConfig: configPath,
    env: {},
    logger(type, args01) {
      loggerOris.push(arguments)
      loggerTypeResults.push(`${type}-${args01}`)
    }
  })
  await yylHander.init({
    seed: testSeed,
    watch: false
  })
  // console.log('loggerOris', loggerOris)
  expect(loggerTypeResults).toEqual([
    'progress-start',
    'progress-0.1',
    'progress-0.2',
    'progress-0.3',
    'progress-0.4',
    'msg-success',
    'msg-success',
    'progress-finished',
    'progress-start',
    'msg-info',
    'progress-finished',
    'msg-info',
    'progress-start',
    'msg-success',
    'msg-success',
    'progress-finished'
  ])
})
