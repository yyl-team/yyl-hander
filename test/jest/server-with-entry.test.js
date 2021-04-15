const { FRAG_PATH } = require('../lib/const')
const extFs = require('yyl-fs')
const SeedResponse = require('yyl-seed-response')
const { YylHander, SERVER_PLUGIN_PATH } = require('../../output')
const { path } = require('yyl-util')

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
          iRes.trigger('progress', ['finished'])
        }, 200)
        return opzer
      },
      watch() {
        setTimeout(() => {
          iRes.trigger('progress', ['finished'])
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

test('server with entry', async () => {
  const name = 'server-with-entry'
  const oriPath = path.join(__dirname, '../case', name)
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  await extFs.copyFiles(oriPath, I_FRAG_PATH)

  // start
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: path.join(I_FRAG_PATH, 'yyl.config.ts')
  })
})