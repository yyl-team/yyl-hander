import { initYylConfig } from 'init-yyl-config'
const pkg = require('./package.json')

module.exports = initYylConfig({
  projectInfo: {
    name: pkg.name,
    workflow: 'other'
  },
  localserver: {
    entry: './server.js'
  }
})