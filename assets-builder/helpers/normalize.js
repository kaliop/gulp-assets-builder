'use strict'

const notify = require('./notify.js')
module.exports = normalizeUserConfig

/**
 * Take the user's task config (which can be a single object,
 * an array of config objects, or an array-like object with common
 * properties (text keys) and several build configs (numeric keys).
 * Return an array of complete and normalized config objects.
 * @param {string} configName
 * @param {Object} userConfig
 * @returns {Array}
 */
function normalizeUserConfig(configName, userConfig) {
  if (typeof userConfig !== 'object') {
    notify({
      title: 'Error: invalid \'' + configName + '\' config object',
      details: 'Config type: ' + typeof userConfig
    })
    return []
  }

  // Separate between text keys and array or array-like indexes
  const base = {}
  const list = []
  for (const key in userConfig) {
    const value = userConfig[key]
    if (isNaN(Number(key))) {
      base[key] = value
    } else if (typeof value === 'object') {
      list.push(value)
    }
  }
  if (list.length === 0) {
    list.push({})
  }

  // Copy from base config values to individual config objects
  for (const key in base) {
    for (const conf of list) {
      if ((key in conf) === false) {
        conf[key] = base[key]
      }
    }
  }

  return list
    // Sanity check
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
  const src = [].concat(conf.src).filter(valid)
  const watch = conf.watch === true ? src : [].concat(conf.watch).filter(valid)
  conf.src = src
  conf.watch = watch
  return conf
}

/**
 * Check that a config object is valid, show an error and drop
 * that config otherwise.
 * @param {string} configName
 * @param {object} conf
 * @returns {boolean}
 */
function validateConfig(configName, conf) {
  if (typeof conf.dest === 'string' && Array.isArray(conf.src) && conf.src.length > 0) {
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
