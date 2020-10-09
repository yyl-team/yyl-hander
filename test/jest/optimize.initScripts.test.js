const fn = require('../lib/util')
const path = require('path')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const yh = new Handler({ log, vars })

test('opzer.initBeforeScripts(all) with string', async () => {
  const name = 'optimize-initbeforescripts-with-string'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  let isWatchBeforeScriptRun = false
  let isWatchAfterScriptRun = false

  // start
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
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

  yh.optimize.init({ config, iEnv: {} })

  await yh.optimize.initBeforeScripts('all')
  await yh.optimize.initAfterScripts('all')
  await yh.optimize.initBeforeScripts('watch')
  await yh.optimize.initAfterScripts('watch')

  // check
  expect(isWatchBeforeScriptRun).toEqual(true)
  expect(isWatchAfterScriptRun).toEqual(true)
}, 0)
