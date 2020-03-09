'use strict';

var _ = require('lodash');
var globby = require('globby');
var readPackageJson = require('./read-package-json');
var path = require('path');

module.exports = function (cwd) {
    var GLOBBY_PACKAGE_JSON = '{*/package.json,@*/*/package.json}';
    var installedPackages = globby.sync(GLOBBY_PACKAGE_JSON, { cwd: cwd });

    return _(installedPackages).map(function (pkgPath) {
        var pkg = readPackageJson(path.resolve(cwd, pkgPath));
        return [pkg.name, pkg.version];
    }).fromPairs().valueOf();
};