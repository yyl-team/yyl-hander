const path = require('path')
const extOs = require('yyl-os')
const { Handler, log, vars, FRAG_PATH } = require('../lib/const')
const yh = new Handler({ log, vars })

test('opzer.getHomePage()', async () => {
  const name = 'optimize-gethomepage'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      }
    }
  })
  yh.optimize.init({ config, iEnv: {} })
  expect(
    await yh.optimize.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(
    `http://${extOs.LOCAL_IP}:${config.localserver.port}/project/1/pc/html/any.html`
  )
}, 0)

test('opzer.getHomePage() with proxy', async () => {
  const name = 'optimize-gethomepage-with-proxy'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      },
      commit: {
        hostname: '//web.yy.com'
      }
    }
  })
  yh.optimize.init({ config, iEnv: { proxy: true } })
  expect(
    await yh.optimize.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(`//web.yy.com/project/1/pc/html/any.html`)
}, 0)

test('opzer.getHomePage() with proxy.homePage', async () => {
  const name = 'optimize-gethomepage-with-proxy-homepage'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      },
      proxy: {
        homePage: 'http://www.yy.com/web/1/'
      }
    }
  })
  yh.optimize.init({ config, iEnv: {} })
  expect(
    await yh.optimize.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(
    `http://${extOs.LOCAL_IP}:${config.localserver.port}/project/1/pc/html/any.html`
  )
}, 0)

test('opzer.getHomePage() with proxy.homePage and --proxy', async () => {
  const name = 'optimize-gethomepage-with-proxy-homepage-and-proxy'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const config = yh.formatConfig({
    dirname: I_FRAG_PATH,
    config: {
      name,
      workflow: 'webpack',
      proxy: {
        homePage: 'http://www.yy.com/web/1/'
      }
    }
  })
  yh.optimize.init({ config, iEnv: { proxy: true } })
  expect(
    await yh.optimize.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual('http://www.yy.com/web/1/')
}, 0)
