const util = require('yyl-util')
const path = require('path')
const { Handler, log, vars } = require('../lib/const')
const yh = new Handler({ log, vars })

const configDir = util.path.join(__dirname, '../case/case-parse-config')
yh.setVars({ PROJECT_PATH: configDir })

test('yh.parseConfig(configPath, iEnv, returnKeys): object', async () => {
  const configPath = path.join(configDir, 'yyl.config.js')
  const r = await yh.parseConfig(configPath, { workflow: 'webpack-vue3' })
  const expectResult = {
    workflow: 'webpack-vue3',
    name: '1',
    version: '3.4.10',
    platform: 'mobile',
    proxy: {
      port: 8887,
      localRemote: {
        'http://web.yy.com/': 'http://127.0.0.1:5000/',
        'http://www.yy.com/web/1':
          'http://127.0.0.1:5000/project/1/mobile/html',
        'http://www.yy.com/api/mock': 'http://127.0.0.1:5000/api/mock'
      },
      homePage: 'http://www.yy.com/web/1/'
    },
    localserver: {
      root: `${configDir}/dist`,
      port: 5000
    },
    dest: {
      basePath: '/project/1/mobile',
      jsPath: 'js',
      jslibPath: 'js/lib',
      cssPath: 'css',
      htmlPath: 'html',
      imagesPath: 'images',
      tplPath: 'tpl',
      revPath: 'assets'
    },
    commit: {
      type: 'gitlab-ci',
      revAddr:
        'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
      hostname: '//web.yystatic.com',
      staticHost: '//web.yystatic.com',
      mainHost: '//www.yy.com/web'
    },
    concat: {},
    resource: {},
    plugins: ['yyl-flexlayout'],
    webpackConfigPath: `${configDir}/webpack.config.js`,
    alias: {
      'root': `${configDir}/dist/project/1/mobile`,
      'revRoot': `${configDir}/dist/project/1/mobile`,
      'destRoot': `${configDir}/dist`,
      'srcRoot': `${configDir}/src`,
      'dirname': `${configDir}`,
      'commons': util.path.join(configDir, '../commons'),
      'globalcomponents': util.path.join(configDir, '../commons/components'),
      'globallib': util.path.join(configDir, '../commons/lib'),
      'jsDest': `${configDir}/dist/project/1/mobile/js`,
      'jslibDest': `${configDir}/dist/project/1/mobile/js/lib`,
      'htmlDest': `${configDir}/dist/project/1/mobile/html`,
      'cssDest': `${configDir}/dist/project/1/mobile/css`,
      'imagesDest': `${configDir}/dist/project/1/mobile/images`,
      'revDest': `${configDir}/dist/project/1/mobile/assets`,
      'tplDest': `${configDir}/dist/project/1/mobile/tpl`,
      '@': `${configDir}/src`,
      '~@': `${configDir}/src/components`
    },
    resolveModule: `${yh.vars.SERVER_PLUGIN_PATH}/webpack-vue3/1/node_modules`
  }

  expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
    `${configDir}/src/js/lib/a.js`,
    `${configDir}/src/js/lib/b.js`
  ]

  expectResult.resource[
    `${configDir}/src/pc/svga`
  ] = `${configDir}/dist/project/1/mobile/tpl`
  expect(r).toEqual(expectResult)
})

test('yh.parseConfig(configPath, iEnv, returnKeys): object no plugins', async () => {
  const configPath = path.join(configDir, 'yyl.config-noplugins.js')
  const r = await yh.parseConfig(configPath)
  const expectResult = {
    workflow: 'webpack-vue2',
    name: '1',
    version: '3.4.10',
    platform: 'mobile',
    proxy: {
      port: 8887,
      localRemote: {
        'http://web.yy.com/': 'http://127.0.0.1:5000/',
        'http://www.yy.com/web/1':
          'http://127.0.0.1:5000/project/1/mobile/html',
        'http://www.yy.com/api/mock': 'http://127.0.0.1:5000/api/mock'
      },
      homePage: 'http://www.yy.com/web/1/'
    },
    localserver: {
      root: `${configDir}/dist`,
      port: 5000
    },
    dest: {
      basePath: '/project/1/mobile',
      jsPath: 'js',
      jslibPath: 'js/lib',
      cssPath: 'css',
      htmlPath: 'html',
      imagesPath: 'images',
      tplPath: 'tpl',
      revPath: 'assets'
    },
    commit: {
      type: 'gitlab-ci',
      revAddr:
        'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
      hostname: '//web.yystatic.com',
      staticHost: '//web.yystatic.com',
      mainHost: '//www.yy.com/web'
    },
    concat: {},
    resource: {},
    plugins: [],
    webpackConfigPath: `${configDir}/webpack.config.js`,
    alias: {
      'root': `${configDir}/dist/project/1/mobile`,
      'revRoot': `${configDir}/dist/project/1/mobile`,
      'destRoot': `${configDir}/dist`,
      'srcRoot': `${configDir}/src`,
      'dirname': `${configDir}`,
      'commons': util.path.join(configDir, '../commons'),
      'globalcomponents': util.path.join(configDir, '../commons/components'),
      'globallib': util.path.join(configDir, '../commons/lib'),
      'jsDest': `${configDir}/dist/project/1/mobile/js`,
      'jslibDest': `${configDir}/dist/project/1/mobile/js/lib`,
      'htmlDest': `${configDir}/dist/project/1/mobile/html`,
      'cssDest': `${configDir}/dist/project/1/mobile/css`,
      'imagesDest': `${configDir}/dist/project/1/mobile/images`,
      'revDest': `${configDir}/dist/project/1/mobile/assets`,
      'tplDest': `${configDir}/dist/project/1/mobile/tpl`,
      '@': `${configDir}/src`,
      '~@': `${configDir}/src/components`
    }
  }

  expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
    `${configDir}/src/js/lib/a.js`,
    `${configDir}/src/js/lib/b.js`
  ]

  expectResult.resource[
    `${configDir}/src/pc/svga`
  ] = `${configDir}/dist/project/1/mobile/tpl`
  expect(r).toEqual(expectResult)
})

test('yh.parseConfig(configPath, iEnv, returnKeys): configPath is function', async () => {
  const configPath = path.join(configDir, 'yyl.config-function.js')
  const r1 = await yh.parseConfig(configPath, { mode: 'master' })
  const r2 = await yh.parseConfig(configPath, { mode: 'dev' })

  expect(r1.commit.hostname).toEqual('//web.yystatic.com')
  expect(r1.commit.staticHost).toEqual('//web.yystatic.com')
  expect(r1.commit.mainHost).toEqual('//www.yy.com/web')

  expect(r2.commit.hostname).toEqual('//webtest.yystatic.com')
  expect(r2.commit.staticHost).toEqual('//webtest.yystatic.com')
  expect(r2.commit.mainHost).toEqual('//webtest.yy.com')
})

test('yh.parseConfig(configPath, iEnv, returnKeys): resource sugar', async () => {
  const configPath = path.join(configDir, 'yyl.config-resource.js')
  const r = await yh.parseConfig(configPath, {})

  const expectObj = {}
  expectObj[util.path.join(configDir, 'src/svga')] = util.path.join(
    configDir,
    'dist/project/1/mobile/tpl'
  )

  expect(r.resource).toEqual(expectObj)
})
