const path = require('path')
const util = require('yyl-util')
const Handler = require('../../lib/yh')

const FRAG_PATH = path.join(__dirname, '../__frag')

const log = () => {}
const USERPROFILE =
  process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']

const vars = {
  PROJECT_PATH: process.cwd(),
  SERVER_PLUGIN_PATH: util.path.join(USERPROFILE, '.yyl/plugins')
}

module.exports = {
  FRAG_PATH,
  Handler,
  log,
  vars
}
