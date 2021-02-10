const fn = require('../lib/util')
const path = require('path')
const { log, FRAG_PATH } = require('../lib/const')
const { YylHander } = require('../../output')

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

  await yylHander.runBeforeScripts('all')
  await yylHander.runAfterScripts('all')
  await yylHander.runBeforeScripts('watch')
  await yylHander.runAfterScripts('watch')

  // check
  expect(isWatchBeforeScriptRun).toEqual(true)
  expect(isWatchAfterScriptRun).toEqual(true)
}, 0)
