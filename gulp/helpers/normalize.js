'use strict'

var notify = require('./notify.js')

/**
 * Normalize a list of config objects with `src`, `dest`
 * and optional `watch` properties.
 * @param {Object} baseConfig
 * @returns {Array}
 */
module.exports = function(baseConfig) {
  var base = {}
  var list = []
  // Number or number-like keys are separate builds, other keys are shared config
  Object.keys(baseConfig).forEach(function(key) {
    var value = baseConfig[key]
    if (isNaN(Number(key))) {
      base[key] = value
    }
    else if (typeof value === 'object') {
      list.push(value)
    }
  })
  // Only one build config
  if (list.length === 0) {
    list.push(base)
  }
  // Or add base values to individual configs
  else {
    list = list.map(function(config) {
      Object.keys(base).forEach(function(key) {
        if (!(key in config)) config[key] = base[key]
      })
      return config
    })
  }
  // Normalize the src and watch properties
  var normalized = list.filter(function(config) {
    return typeof config === 'object'
  }).map(function(config) {
    config.src = [].concat(config.src).filter(function(x) {
      return typeof x === 'string' && x.trim() !== ''
    })
    if (config.watch === true) {
      config.watch = config.src
    }
    return config
  })
  // Finally, only keep valid configs objects
  return normalized.filter(function(config) {
    var ok = typeof config.dest === 'string' &&
      Array.isArray(config.src) &&
      config.src.length > 0
    if (!ok) notify({
      title: '[assets-builder] Invalid config object',
      message: JSON.stringify(config)
    })
    return ok
  })
}
