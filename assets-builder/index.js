'use strict'

const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const notify = require('./helpers/notify.js')
const register = require('./helpers/register.js')

/**
 * Set up assets-builder’s gulp tasks, based on available
 * task scripts (in the `tasks` subdir) and user-provided config.
 * @param {Object} config
 */
module.exports = function assetsBuilder(config) {

  if (typeof config !== 'object') {
    notify({
      title: 'Error: Missing config',
      details: 'Make sure you call assets-builder with a config object'
    })
    process.exitCode = 1
    return
  }

  const activeScripts = {}
  const activeTasks = []

  // Check that the task script exists
  for (const key in config) {
    const relPath = 'tasks/' + key.trim().replace('..', '') + '.js'
    if (key.indexOf('_') === 0) {
      notify({
        title: 'Warning: ignoring \'' + key + '\' config (starts with underscore)',
        warn: true
      })
    }
    else if (fs.existsSync(__dirname + '/' + relPath)) {
      activeScripts[key] = relPath
    }
    else {
      notify({
        title: 'Warning: ignoring \'' + key + '\' config (no file at ' + path.basename(__dirname) + '/' + relPath + ')',
        warn: true
      })
    }
  }

  // Register individual tasks
  try {
    Object.keys(activeScripts).forEach(function(name) {
      const builder = require('./' + activeScripts[name])
      const tasks = register(name, config[name], builder)
      activeTasks = activeTasks.concat(tasks)
    })
  }
  catch(err) {
    let dealtWith = false
    if (err.code === 'MODULE_NOT_FOUND') {
      const modules = checkDependencies(activeScripts)
      const name = (err.message.match(/module '(.*)'/) || [null, null])[1]
      // we alerted about that missing dependency already?
      dealtWith = name && modules.indexOf(name) !== -1
    }
    if (dealtWith === false) {
      throw err
    }
  }

  // Register tasks groups
  gulp.task('build', activeTasks.filter(x => x.indexOf('build') === 0))
  gulp.task('watch', activeTasks.filter(x => x.indexOf('watch') === 0))

  if (activeTasks.length === 0) {
    notify({
      title: 'Error: No tasks found',
      details: 'assets-builder configuration was invalid, or tasks failed to load'
    })
  }
}

/**
 * Load tasks' JSON files with dependencies, try loading each dependency
 * and log the missing deps with instructions on how to install.
 * Note: we are NOT resolving version conflicts of any kind.
 * @param {Object} scripts
 * @returns {Array} - names of missing modules
 */
function checkDependencies(scripts) {
  const missing = []
  // Try to load each dependency
  for (const name in scripts) {
    try {
      const json = require('./' + scripts[name].replace('.js', '.json'))
      const badModules = []
      for (const key in json.dependencies) {
        try { const x = require(key) }
        catch(err) {
          if (err.code === 'MODULE_NOT_FOUND') {
            badModules.push({name: key, version: json.dependencies[key]})
          }
        }
      }
      if (badModules.length !== 0) {
        missing.push({task: name, modules: badModules})
      }
    } catch(e) {}
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
