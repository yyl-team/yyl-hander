const fn = require('../lib/util')
const path = require('path')
const extFs = require('yyl-fs')
const fs = require('fs')
const { log, FRAG_PATH } = require('../lib/const')
const { YylHander, SERVER_PLUGIN_PATH } = require('../../')
const yh = new Handler({ log, vars })

test('yylHander.initPlugins() with config.plugins', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      plugins: ['yyl-flexlayout']
    }
  })

  const yylConfig = yylHander.getYylConfig()

  const serverPluginPath = path.join(SERVER_PLUGIN_PATH, yylConfig.workflow, yylConfig.name)

  await extFs.removeFiles(serverPluginPath)

  await yylHander.initPlugins()

  // plugins check
  expect(fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))).toEqual(true)
}, 0)

test('yylHander.initPlugins() with yarn', async () => {
  const name = 'optimize-initplugins-with-config-plugins-yarn'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      plugins: ['yyl-flexlayout'],
      yarn: true
    }
  })

  const yylConfig = yylHander.getYylConfig()

  const serverPluginPath = path.join(SERVER_PLUGIN_PATH, yylConfig.workflow, yylConfig.name)

  await extFs.removeFiles(serverPluginPath)

  await yylHander.initPlugins()

  // plugins check
  expect(fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))).toEqual(true)

  expect(fs.existsSync(path.join(serverPluginPath, 'yarn.lock'))).toEqual(true)
}, 0)
