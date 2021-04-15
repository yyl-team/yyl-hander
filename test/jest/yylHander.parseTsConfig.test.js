const util = require('yyl-util')
const path = require('path')
const { YylHander, SERVER_PLUGIN_PATH } = require('../../output')

const configDir = util.path.join(__dirname, '../case/parse-ts-config/')
test('yylHander.parseConfig(): ts', async () => {
  const configPath = path.join(configDir, 'yyl.config.ts')
  const yylHander = new YylHander({
    yylConfig: configPath,
    env: {}
  })
  const r = yylHander.getYylConfig()
  expect(r.workflow).toEqual('other')
})
