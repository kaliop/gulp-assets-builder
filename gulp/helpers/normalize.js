'use strict'

/**
 * Normalize a list of config objects with `src`, `dest`
 * and optional `watch` properties.
 * @param {Array|Object} configs
 * @returns {Array}
 */
module.exports = function(configs) {
  return [].concat(configs)
    .filter(function(config) {
      return typeof config === 'object' && config.src && config.dest
    })
    .map(function(config) {
      config.src = [].concat(config.src).filter(function(x) {
        return typeof x === 'string'
      })
      if (config.watch === true) {
        config.watch = config.src
      }
      return config
    })
}
