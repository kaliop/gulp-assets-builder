'use strict'

var notify = require('./notify.js')

/**
 * Normalize a list of config objects with `src`, `dest`
 * and optional `watch` properties.
 * @param {Object} baseConfig
 * @returns {Array}
 */
module.exports = function(baseConfig) {
  var list = []
  // Make full config objects if we have several build entries
  if (typeof baseConfig === 'object' && Array.isArray(baseConfig.builds)) {
    var common = Object.keys(baseConfig).filter(function(x){return x!=='builds'})
    baseConfig.builds.forEach(function(build) {
      var config = {}
      common.concat(Object.keys(build)).forEach(function(key) {
        config[key] = key in build ? build[key] : baseConfig[key]
      })
      list.push(config)
    })
  }
  else {
    list.push(baseConfig)
  }
  // Normalize the src and watch properties
  var normalized = list.map(function(config) {
    if (typeof config !== 'object') return config
    config.src = [].concat(config.src).filter(function(x) {
      return typeof x === 'string' && x.trim() !== ''
    })
    if (config.watch === true) {
      config.watch = config.src
    }
    return config
  })
  // And filter final configs objects
  return normalized.filter(function(config) {
    var ok = typeof config === 'object' &&
      typeof config.dest === 'string' &&
      Array.isArray(config.src) &&
      config.src.length > 0
    if (!ok) notify({
      title: '[assets-builder] Invalid config object',
      message: JSON.stringify(config)
    })
    return ok
  })
}
