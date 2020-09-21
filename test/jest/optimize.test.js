const fn = require('../lib/util')
const path = require('path')
const extFs = require('yyl-fs')
const fs = require('fs')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const yh = new Handler({ log, vars })

test('yh.optimize test', async () => {
  const I_FRAG_PATH = path.join(FRAG_PATH, 'optimize-yarn')
  // 准备
  await fn.frag.build(I_FRAG_PATH)
  const casePath = path.join(__dirname, '../case/case-optimize/')
  await extFs.copyFiles(casePath, I_FRAG_PATH)

  // 开始
  const configPath = path.join(I_FRAG_PATH, 'yyl.config.js')
  const iEnv = { isCommit: true, branches: 'master' }
  const config = await yh.parseConfig(configPath, iEnv)

  const serverPluginPath = path.join(
    yh.vars.SERVER_PLUGIN_PATH,
    config.workflow,
    config.name
  )
  await extFs.removeFiles(serverPluginPath)

  yh.optimize.init({ config, iEnv })

  // 构建模拟
  await yh.optimize.initPlugins()

  // plugins check
  expect(
    fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))
  ).toEqual(true)

  // homepage check
  expect(await yh.optimize.getHomePage({})).toEqual('http://www.yy.com/web/1/')

  // homepage files check
  config.proxy.homePage = undefined
  iEnv.proxy = true
  yh.optimize.init({ config, iEnv })
  expect(
    await yh.optimize.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual('http://web.yy.com/project/1/pc/html/any.html')
}, 0)
