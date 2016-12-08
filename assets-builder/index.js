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

  // Check that the task script exists
  const scripts = {}
  for (const key in config) {
    const relPath = 'tasks/' + key.trim().replace('..', '') + '.js'
    if (key.indexOf('_') === 0) {
      notify({
        title: 'Warning: ignoring \'' + key + '\' config (starts with underscore)',
        warn: true
      })
    }
    else if (fs.existsSync(__dirname + '/' + relPath)) {
      scripts[key] = __dirname + '/' + relPath
    }
    else {
      notify({
        title: 'Warning: ignoring \'' + key + '\' config (no file at '
          + path.basename(__dirname) + '/' + relPath + ')',
        warn: true
      })
    }
  }

  // Register individual tasks
  const tasks = []
  try {
    for (const name in scripts) {
      const builder = require(scripts[name])
      register(name, config[name], builder).forEach(t => tasks.push(t))
    }
  }
  catch(err) {
    let knownMissing = false
    if (err.code === 'MODULE_NOT_FOUND') {
      const missing = require('./helpers/dependencies.js')(scripts)
      const name = (err.message.match(/module '(.*)'/) || [null,null])[1]
      // did we alert about that missing dependency already?
      knownMissing = name && missing.indexOf(name) !== -1
    }
    if (!knownMissing) {
      throw err
    }
  }

  // Register tasks groups
  gulp.task('build', tasks.filter(s => s.includes('build')))
  gulp.task('watch', tasks.filter(s => s.includes('watch')))

  if (tasks.length === 0) {
    notify({
      title: 'Error: No tasks found',
      details: 'assets-builder configuration was invalid, or tasks failed to load'
    })
  }
}
