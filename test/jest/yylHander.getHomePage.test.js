const path = require('path')
const extOs = require('yyl-os')
const { log, FRAG_PATH } = require('../lib/const')
const { YylHander } = require('../../output')

test('yylHander.getHomePage()', async () => {
  const name = 'optimize-gethomepage'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      }
    }
  })
  const yylConfig = yylHander.getYylConfig()
  expect(
    await yylHander.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(`http://${extOs.LOCAL_IP}:${yylConfig.localserver.port}/project/1/pc/html/any.html`)
}, 0)

test('yylHander.getHomePage() with proxy', async () => {
  const name = 'optimize-gethomepage-with-proxy'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    env: {
      proxy: true
    },
    yylConfig: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      },
      commit: {
        hostname: '//web.testhost.com'
      }
    }
  })
  expect(
    await yylHander.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(`//web.testhost.com/project/1/pc/html/any.html`)
}, 0)

test('yylHander.getHomePage() with proxy.homePage', async () => {
  const name = 'optimize-gethomepage-with-proxy-homepage'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      localserver: {
        root: './dist',
        port: 5000
      },
      proxy: {
        homePage: 'http://www.testhost.com/web/1/'
      }
    }
  })
  const yylConfig = yylHander.getYylConfig()
  expect(
    await yylHander.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual(`http://${extOs.LOCAL_IP}:${yylConfig.localserver.port}/project/1/pc/html/any.html`)
}, 0)

test('yylHander.getHomePage() with proxy.homePage and --proxy', async () => {
  const name = 'optimize-gethomepage-with-proxy-homepage-and-proxy'
  const I_FRAG_PATH = path.join(FRAG_PATH, name)
  const yylHander = new YylHander({
    context: I_FRAG_PATH,
    yylConfig: {
      name,
      workflow: 'webpack',
      proxy: {
        homePage: 'http://www.testhost.com/web/1/'
      }
    },
    env: {
      proxy: true
    }
  })
  expect(
    await yylHander.getHomePage({
      files: [path.join(I_FRAG_PATH, 'dist/project/1/pc/html/any.html')]
    })
  ).toEqual('http://www.testhost.com/web/1/')
}, 0)
