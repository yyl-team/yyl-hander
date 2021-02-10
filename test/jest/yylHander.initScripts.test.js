const fn = require('../lib/util')
const path = require('path')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const { YylHander } = require('../../output')
const yh = new Handler({ log, vars })

test('yylHander.runBeforeScripts(all) with string', async () => {
  const name = 'optimize-initbeforescripts-with-string'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  let isWatchBeforeScriptRun = false
  let isWatchAfterScriptRun = false

  // start
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      all: {
        beforeScripts: 'echo "all before scritp"',
        afterScripts: 'echo "all after script"'
      },
      watch: {
        async beforeScripts({ env, config }) {
          isWatchBeforeScriptRun = true
          expect(env).not.toEqual(undefined)
          expect(config).not.toEqual(undefined)
        },
        async afterScripts({ env, config }) {
          isWatchAfterScriptRun = true
          expect(env).not.toEqual(undefined)
          expect(config).not.toEqual(undefined)
        }
      }
    }
  })

  await yh.optimize.runBeforeScripts('all')
  await yh.optimize.runAfterScripts('all')
  await yh.optimize.runBeforeScripts('watch')
  await yh.optimize.runAfterScripts('watch')

  // check
  expect(isWatchBeforeScriptRun).toEqual(true)
  expect(isWatchAfterScriptRun).toEqual(true)
}, 0)
