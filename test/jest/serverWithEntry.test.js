const { FRAG_PATH } = require('../lib/const')
const extFs = require('yyl-fs')
const SeedResponse = require('yyl-seed-response')
const { YylHander, SERVER_PLUGIN_PATH } = require('../../output')
const { path } = require('yyl-util')
const express = require('express')

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

test('server with entry', async () => {
  const name = 'server-with-entry'
  const oriPath = path.join(__dirname, '../case', name)
  let app
  const yylHander = new YylHander({
    context: oriPath,
    yylConfig: {
      name: 'server-with-entry',
      workflow: 'other',
      localserver: {
        port: 5000,
        entry({ env }) {
          app = express()
          const distPath = path.join(oriPath, 'site')
          app.use(express.static(distPath))
          return app
        }
      }
    }
  })

  await yylHander.init({
    seed: testSeed,
    watch: true
  })
  expect(!!app).toEqual(true)
})
