const fn = require('../lib/util')
const util = require('yyl-util')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const yh = new Handler({ log, vars })

test('formatConfig() return default ', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = util.path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      workflow: 'webpack'
    }
  })

  expect(config).toEqual({
    name: 'any',
    workflow: 'webpack',
    platform: 'pc',
    alias: {
      dirname: I_FRAG_PATH,
      srcRoot: I_FRAG_PATH,
      destRoot: I_FRAG_PATH,
      imagesDest: I_FRAG_PATH,
      jsDest: I_FRAG_PATH,
      revDest: I_FRAG_PATH,
      jslibDest: I_FRAG_PATH,
      cssDest: I_FRAG_PATH,
      htmlDest: I_FRAG_PATH,
      tplDest: I_FRAG_PATH
    },
    commit: {
      hostname: '/'
    }
  })
}, 0)

test('formatConfig() with resource and concat ', async () => {
  const name = 'optimize-initplugins-with-config-plugins'
  const I_FRAG_PATH = util.path.join(FRAG_PATH, name)
  // 准备
  await fn.frag.build(I_FRAG_PATH)

  // start
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      workflow: 'webpack',
      concat: {
        // js 合并
        '{$jsDest}/vendors.js': [
          '{$srcRoot}/js/lib/a.js',
          '{$srcRoot}/js/lib/b.js'
        ]
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

  expect(config).toEqual({
    name: 'any',
    workflow: 'webpack',
    platform: 'pc',
    resource: (() => {
      const r = {}
      r[util.path.join(I_FRAG_PATH, 'src/svga')] = util.path.join(
        I_FRAG_PATH,
        'dist/tpl'
      )
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
      imagesDest: util.path.join(I_FRAG_PATH, 'dist'),
      jsDest: util.path.join(I_FRAG_PATH, 'dist/js'),
      revDest: util.path.join(I_FRAG_PATH, 'dist'),
      jslibDest: util.path.join(I_FRAG_PATH, 'dist'),
      cssDest: util.path.join(I_FRAG_PATH, 'dist'),
      htmlDest: util.path.join(I_FRAG_PATH, 'dist'),
      tplDest: util.path.join(I_FRAG_PATH, 'dist/tpl')
    },
    commit: {
      hostname: '/'
    }
  })
}, 0)
