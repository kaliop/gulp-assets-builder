/**
 * Try to require a bunch of node dependencies, and log a warning in the
 * console if it fails, with some indications on installation.
 */
module.exports = function loadModules(taskName, moduleDefs) {
  var deps = {}
  var missing = []
  var names = Object.getOwnPropertyNames(moduleDefs)
  names.forEach(function(module){
    try { deps[module] = require(module) }
    catch (err) {
      var m = err.message || ''
      if (m.indexOf('Cannot find module') !== -1 && m.indexOf(module)) {
        missing.push({ module: module, version: moduleDefs[module] })
      } else {
        throw err
      }
    }
  })
  if (missing.length) {
    throw missingModuleException(taskName, missing)
  }
  return deps;
}

/**
 * Generates the text for an exception listing all modules that were missing
 * @param {string} taskName
 * @param {array} missing
 * @returns {{name: string, message: string}}
 */
function missingModuleException(taskName, missing) {
  var names = [], commands = [];
  missing.forEach(function(info){
    var tag = typeof info.version !== 'string' ? '' : '@"' + info.version + '"';
    names.push(info.module)
    commands.push(info.module + tag)
  })
  return {
    name: 'Uninstalled Dependencies',
    message: 'Missing dependencies for ' + taskName + '\n' +
    'Could not require modules: ' + names.join(', ') + '\n\n' +
    'Try installing dependencies with:\n' +
    '  npm install --save-dev ' + commands.join(' ') + '\n'
  }
}
