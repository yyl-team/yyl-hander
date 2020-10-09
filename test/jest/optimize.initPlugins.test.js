const fn = require('../lib/util')
const path = require('path')
const extFs = require('yyl-fs')
const fs = require('fs')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const yh = new Handler({ log, vars })

test('opzer.initPlugins() with config.plugins', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      plugins: ['yyl-flexlayout']
    }
  })

  const serverPluginPath = path.join(
    yh.vars.SERVER_PLUGIN_PATH,
    config.workflow,
    config.name
  )

  await extFs.removeFiles(serverPluginPath)

  yh.optimize.init({ config, iEnv: {} })

  await yh.optimize.initPlugins()

  // plugins check
  expect(
    fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))
  ).toEqual(true)
}, 0)

test('opzer.initPlugins() with yarn', async () => {
  const name = 'optimize-initplugins-with-config-plugins-yarn'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      plugins: ['yyl-flexlayout'],
      yarn: true
    }
  })

  const serverPluginPath = path.join(
    yh.vars.SERVER_PLUGIN_PATH,
    config.workflow,
    config.name
  )

  await extFs.removeFiles(serverPluginPath)

  yh.optimize.init({ config, iEnv: {} })

  await yh.optimize.initPlugins()

  // plugins check
  expect(
    fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))
  ).toEqual(true)

  expect(fs.existsSync(path.join(serverPluginPath, 'yarn.lock'))).toEqual(true)
}, 0)
