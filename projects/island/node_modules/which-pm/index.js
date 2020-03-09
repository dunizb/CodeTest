'use strict'
const path = require('path')
const pathExists = require('path-exists')
const loadYamlFile = require('load-yaml-file')

module.exports = function (pkgPath) {
  const modulesPath = path.join(pkgPath, 'node_modules')
  return pathExists(path.join(modulesPath, '.yarn-integrity'))
    .then(exists => {
      if (exists) return { name: 'yarn' }

      return loadYamlFile(path.join(modulesPath, '.modules.yaml'))
        .then(modules => toNameAndVersion(modules.packageManager))
        .catch(err => {
          if (err.code !== 'ENOENT') throw err

          return pathExists(modulesPath)
            .then(modulesExists => {
              return modulesExists ? { name: 'npm' } : null
            })
        })
    })
}

function toNameAndVersion (pkgSpec) {
  if (pkgSpec[0] === '@') {
    const woPrefix = pkgSpec.substr(1)
    const parts = woPrefix.split('@')
    return {
      name: `@${parts[0]}`,
      version: parts[1]
    }
  }
  const parts = pkgSpec.split('@')
  return {
    name: parts[0],
    version: parts[1]
  }
}
