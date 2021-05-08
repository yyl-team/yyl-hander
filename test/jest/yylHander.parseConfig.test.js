const util = require('yyl-util')
const path = require('path')
const { log, vars } = require('../lib/const')
const { YylHander, SERVER_PLUGIN_PATH } = require('../../output')

const configDir = util.path.join(__dirname, '../case/case-parse-config')

test('yylHander.parseConfig(): object', async () => {
  const configPath = path.join(configDir, 'yyl.config.js')
  const yylHander = new YylHander({
    yylConfig: configPath,
    env: {
      workflow: 'webpack-vue3'
    }
  })
  const r = yylHander.getYylConfig()
  const expectResult = {
    workflow: 'webpack-vue3',
    name: '1',
    version: '3.4.10',
    platform: 'mobile',
    proxy: {
      port: 8887,
      localRemote: {
        'http://web.testhost.com/': 'http://127.0.0.1:5000/',
        'http://www.testhost.com/web/1': 'http://127.0.0.1:5000/project/1/mobile/html',
        'http://www.testhost.com/api/mock': 'http://127.0.0.1:5000/api/mock'
      },
      homePage: 'http://www.testhost.com/web/1/'
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
      revAddr: 'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
      hostname: '//web.yystatic.com',
      staticHost: '//web.yystatic.com',
      mainHost: '//www.testhost.com/web'
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
    resolveModule: `${SERVER_PLUGIN_PATH}/webpack-vue3/1/node_modules`
  }

  expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
    `${configDir}/src/js/lib/a.js`,
    `${configDir}/src/js/lib/b.js`
  ]

  expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`
  expect(r).toEqual(expectResult)
})

test('yylHander.parseConfig(): env.config', async () => {
  const configPath = path.join(configDir, 'yyl.config-env.config.js')
  const yylHander = new YylHander({
    env: {
      workflow: 'webpack-vue3',
      config: configPath
    }
  })
  const r = yylHander.getYylConfig()
  const expectResult = {
    workflow: 'webpack-vue3',
    name: '1',
    version: '3.4.10',
    platform: 'mobile',
    proxy: {
      port: 8887,
      localRemote: {
        'http://web.testhost.com/': 'http://127.0.0.1:5000/',
        'http://www.testhost.com/web/1': 'http://127.0.0.1:5000/project/1/mobile/html',
        'http://www.testhost.com/api/mock': 'http://127.0.0.1:5000/api/mock'
      },
      homePage: 'http://www.testhost.com/web/1/'
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
      revAddr: 'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
      hostname: '//web.yystatic.com',
      staticHost: '//web.yystatic.com',
      mainHost: '//www.testhost.com/web'
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
    resolveModule: `${SERVER_PLUGIN_PATH}/webpack-vue3/1/node_modules`
  }

  expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
    `${configDir}/src/js/lib/a.js`,
    `${configDir}/src/js/lib/b.js`
  ]

  expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`
  expect(r).toEqual(expectResult)
})

test('yylHander.parseConfig(): object no plugins', async () => {
  const configPath = path.join(configDir, 'yyl.config-noplugins.js')
  const yylHander = new YylHander({
    yylConfig: configPath
  })
  const r = yylHander.getYylConfig()
  const expectResult = {
    workflow: 'webpack-vue2',
    name: '1',
    version: '3.4.10',
    platform: 'mobile',
    proxy: {
      port: 8887,
      localRemote: {
        'http://web.testhost.com/': 'http://127.0.0.1:5000/',
        'http://www.testhost.com/web/1': 'http://127.0.0.1:5000/project/1/mobile/html',
        'http://www.testhost.com/api/mock': 'http://127.0.0.1:5000/api/mock'
      },
      homePage: 'http://www.testhost.com/web/1/'
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
      revAddr: 'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
      hostname: '//web.yystatic.com',
      staticHost: '//web.yystatic.com',
      mainHost: '//www.testhost.com/web'
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

  expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`
  expect(r).toEqual(expectResult)
})

test('yylHander.parseConfig(): configPath is function', async () => {
  const configPath = path.join(configDir, 'yyl.config-function.js')
  const yylHander1 = new YylHander({
    yylConfig: configPath,
    env: { mode: 'master' }
  })
  const yylHander2 = new YylHander({
    yylConfig: configPath,
    env: {
      mode: 'dev'
    }
  })
  const r1 = yylHander1.getYylConfig()
  const r2 = yylHander2.getYylConfig()

  expect(r1.commit.hostname).toEqual('//web.yystatic.com')
  expect(r1.commit.staticHost).toEqual('//web.yystatic.com')
  expect(r1.commit.mainHost).toEqual('//www.testhost.com/web')

  expect(r2.commit.hostname).toEqual('//webtest.yystatic.com')
  expect(r2.commit.staticHost).toEqual('//webtest.yystatic.com')
  expect(r2.commit.mainHost).toEqual('//webtest.testhost.com')
})

test('yylHander.parseConfig(): resource sugar', async () => {
  const configPath = path.join(configDir, 'yyl.config-resource.js')
  const yylHander = new YylHander({
    yylConfig: configPath
  })
  const r = yylHander.getYylConfig()

  const expectObj = {}
  expectObj[util.path.join(configDir, 'src/svga')] = util.path.join(
    configDir,
    'dist/project/1/mobile/tpl'
  )

  expect(r.resource).toEqual(expectObj)
})
