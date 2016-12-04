'use strict'

const notify = require('./notify.js')
module.exports = normalizeConfigs

/**
 * Normalize a list of config objects with `src`, `dest`
 * and optional `watch` properties.
 * @param {string} configName
 * @param {Object} baseConfig
 * @returns {Array}
 */
function normalizeConfigs(configName, baseConfig) {
  let base = {}
  let list = []
  if (typeof baseConfig !== 'object') {
    notify({
      title: 'Error: invalid \'' + configName + '\' config object',
      details: 'Config type: ' + typeof baseConfig
    })
    return list
  }
  // Number or number-like keys are separate builds, other keys are shared config
  for (let key in baseConfig) {
    let value = baseConfig[key]
    if (isNaN(Number(key))) {
      base[key] = value
    } else if (typeof value === 'object') {
      list.push(value)
    }
  }
  // Only one build config
  if (list.length === 0) {
    list.push(base)
  }
  // Or add base values to individual configs
  else {
    list = list.map(conf => {
      for (let key in base) {
        if ((key in conf) === false) conf[key] = base[key]
      }
      return conf
    })
  }
  return list
    .filter(conf => typeof conf === 'object')
    // Normalize the src and watch properties
    .map(normalizeSrc)
    // And only keep valid configs objects
    .filter(conf => validateConfig(configName, conf))
}

/**
 * Make sure the 'src' and 'watch' properties of an object are arrays of strings
 * @param {object} conf
 * @returns {object}
 */
function normalizeSrc(conf) {
  const valid = s => typeof s === 'string' && s.trim() !== ''
  let src = [].concat(conf.src).filter(valid)
  let watch = false
  if (conf.watch === true) {
    watch = src
  } else if (conf.watch) {
    watch = [].concat(conf.watch).filter(valid)
  }
  conf.src = src
  conf.watch = watch
  return conf
}

/**
 * Check that a config object is valid, show an error and drop
 * that config otherwise.
 * @param configName
 * @param conf
 * @returns {boolean}
 */
function validateConfig(configName, conf) {
  if (typeof conf.dest === 'string' &&
    Array.isArray(conf.src) &&
    conf.src.length > 0) {
    return true;
  }
  else {
    notify({
      title: 'Error: invalid \'' + configName + '\' config object',
      details: JSON.stringify(conf, null, 2)
        .replace(/^{\n  /, '{ ')
        .replace(/\n}$/, ' }')
    })
    return false
  }
}
