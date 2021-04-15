const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
const distPath = path.join(__dirname, './site')
app.use(express.static(distPath))
app.listen(5000)

module.exports = app
