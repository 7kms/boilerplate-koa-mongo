const path = require('path')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  }
}