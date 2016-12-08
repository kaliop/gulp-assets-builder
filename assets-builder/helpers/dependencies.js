'use strict'

const notify = require('./notify.js')

/**
 * Load tasks' JSON files with dependencies, try loading each dependency
 * and log the missing deps with instructions on how to install.
 * Note: we are NOT resolving version conflicts of any kind.
 * @param {Object} scripts
 * @returns {Array} - names of missing modules
 */
module.exports = function checkDependencies(scripts) {
  const missing = []
  // Try to load each dependency
  for (const name in scripts) {
    const badModules = []
    let json = {}
    try { json = require(scripts[name].replace('.js', '.json')) } catch(e) {}
    for (const key in json.dependencies || {}) {
      try { require(key) }
      catch(err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          badModules.push({name: key, version: json.dependencies[key]})
        }
      }
    }
    if (badModules.length !== 0) {
      missing.push({task: name, modules: badModules})
    }
  }
  // Print information we found
  const modulesFlat = missing.reduce((arr, x) => arr.concat(x.modules), [])
  if (missing.length !== 0) {
    const pad = '               '
    const title = 'Error: missing dependencies for \''
      + missing.map(function(x){ return x.task }).join('\', \'')
      + '\''
    notify({
      title: missing.length > 1 ? title : title.replace('tasks:', 'task:'),
      details: '\nTo fix this, install missing dependencies:\n\nnpm install -D "'
      + modulesFlat.map(function(m){ return m.name + '@' + m.version }).join('" \\\n' + pad + '"')
      + '"\n'
    })
  }
  // Return names of missing modules
  return modulesFlat.map(function(m) { return m.name })
}
