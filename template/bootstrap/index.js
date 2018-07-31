const logger = require('../utils/logger')
// console.log(logger)
global._console = logger
require('babel-register')()
require('babel-polyfill')
require('./app')
