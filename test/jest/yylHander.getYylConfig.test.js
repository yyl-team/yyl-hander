const fn = require('../lib/util')
const util = require('yyl-util')
const { log, FRAG_PATH } = require('../lib/const')
const { YylHander } = require('../../')

test('yylHander() return default ', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = util.path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      workflow: 'webpack'
    }
  })

  expect(yylHander.getYylConfig()).toEqual({
    name: 'default',
    workflow: 'webpack',
    platform: 'pc',
    localserver: {
      port: 5000,
      root: util.path.join(I_FRAG_PATH, 'dist')
    },
    alias: {
      dirname: I_FRAG_PATH,
      srcRoot: util.path.join(I_FRAG_PATH, 'src'),
      destRoot: util.path.join(I_FRAG_PATH, 'dist'),
      imagesDest: util.path.join(I_FRAG_PATH, 'dist/images'),
      jsDest: util.path.join(I_FRAG_PATH, 'dist/js'),
      revDest: util.path.join(I_FRAG_PATH, 'dist'),
      cssDest: util.path.join(I_FRAG_PATH, 'dist/css'),
      htmlDest: util.path.join(I_FRAG_PATH, 'dist/html'),
      root: util.path.join(I_FRAG_PATH, 'dist'),
      revRoot: util.path.join(I_FRAG_PATH, 'dist'),
      revDest: util.path.join(I_FRAG_PATH, 'dist/assets')
    },
    commit: {
      revAddr: '',
      hostname: '/'
    }
  })
}, 0)

test('yylHander() with resource and concat ', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = util.path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      workflow: 'webpack',
      concat: {
        // js 合并
        '{$jsDest}/vendors.js': ['{$srcRoot}/js/lib/a.js', '{$srcRoot}/js/lib/b.js']
      },
      resource: {
        // 自定义项目中其他需打包的文件夹
        'src/svga': '{$tplDest}'
      },
      alias: {
        dirname: './',
        jsDest: 'dist/js',
        tplDest: 'dist/tpl',
        srcRoot: './src',
        destRoot: './dist'
      }
    }
  })

  expect(yylHander.getYylConfig()).toEqual({
    name: 'default',
    workflow: 'webpack',
    platform: 'pc',
    localserver: {
      port: 5000,
      root: util.path.join(I_FRAG_PATH, 'dist')
    },
    resource: (() => {
      const r = {}
      r[util.path.join(I_FRAG_PATH, 'src/svga')] = util.path.join(I_FRAG_PATH, 'dist/tpl')
      return r
    })(),
    concat: (() => {
      const r = {}
      r[util.path.join(I_FRAG_PATH, 'dist/js/vendors.js')] = [
        util.path.join(I_FRAG_PATH, 'src/js/lib/a.js'),
        util.path.join(I_FRAG_PATH, 'src/js/lib/b.js')
      ]
      return r
    })(),
    alias: {
      dirname: I_FRAG_PATH,
      srcRoot: util.path.join(I_FRAG_PATH, 'src'),
      destRoot: util.path.join(I_FRAG_PATH, 'dist'),
      imagesDest: util.path.join(I_FRAG_PATH, 'dist/images'),
      jsDest: util.path.join(I_FRAG_PATH, 'dist/js'),
      revDest: util.path.join(I_FRAG_PATH, 'dist/assets'),
      cssDest: util.path.join(I_FRAG_PATH, 'dist/css'),
      htmlDest: util.path.join(I_FRAG_PATH, 'dist/html'),
      tplDest: util.path.join(I_FRAG_PATH, 'dist/tpl'),
      revRoot: util.path.join(I_FRAG_PATH, 'dist'),
      root: util.path.join(I_FRAG_PATH, 'dist')
    },
    commit: {
      revAddr: '',
      hostname: '/'
    }
  })
}, 0)
