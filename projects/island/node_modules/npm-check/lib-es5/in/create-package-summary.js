'use strict';

var readPackageJson = require('./read-package-json');
var getLatestFromRegistry = require('./get-latest-from-registry');
var findModulePath = require('./find-module-path');
var _ = require('lodash');
var semverDiff = require('semver-diff');
var pathExists = require('path-exists');
var path = require('path');
var semver = require('semver');
var minimatch = require('minimatch');

function createPackageSummary(moduleName, currentState) {
    var cwdPackageJson = currentState.get('cwdPackageJson');

    var modulePath = findModulePath(moduleName, currentState);
    var packageIsInstalled = pathExists.sync(modulePath);
    var modulePackageJson = readPackageJson(path.join(modulePath, 'package.json'));

    // Ignore private packages
    var isPrivate = Boolean(modulePackageJson.private);
    if (isPrivate) {
        return false;
    }

    // Ignore packages that are using github or file urls
    var packageJsonVersion = cwdPackageJson.dependencies[moduleName] || cwdPackageJson.devDependencies[moduleName] || currentState.get('globalPackages')[moduleName];

    if (packageJsonVersion && !semver.validRange(packageJsonVersion)) {
        return false;
    }

    // Ignore specified '--ignore' package globs
    var ignore = currentState.get('ignore');
    if (ignore) {
        var ignoreMatch = Array.isArray(ignore) ? ignore.some(function (ignoredModule) {
            return minimatch(moduleName, ignoredModule);
        }) : minimatch(moduleName, ignore);
        if (ignoreMatch) {
            return false;
        }
    }

    var unusedDependencies = currentState.get('unusedDependencies');
    var missingFromPackageJson = currentState.get('missingFromPackageJson');

    function foundIn(files) {
        if (!files) {
            return;
        }

        return 'Found in: ' + files.map(function (filepath) {
            return filepath.replace(currentState.get('cwd'), '');
        }).join(', ');
    }

    return getLatestFromRegistry(moduleName).then(function (fromRegistry) {
        var installedVersion = modulePackageJson.version;

        var latest = installedVersion && fromRegistry.latest && fromRegistry.next && semver.gt(installedVersion, fromRegistry.latest) ? fromRegistry.next : fromRegistry.latest;
        var versions = fromRegistry.versions || [];

        var versionWanted = semver.maxSatisfying(versions, packageJsonVersion);

        var versionToUse = installedVersion || versionWanted;
        var usingNonSemver = semver.valid(latest) && semver.lt(latest, '1.0.0-pre');

        var bump = semver.valid(latest) && semver.valid(versionToUse) && (usingNonSemver && semverDiff(versionToUse, latest) ? 'nonSemver' : semverDiff(versionToUse, latest));

        var unused = _.includes(unusedDependencies, moduleName);

        return {
            // info
            moduleName: moduleName,
            homepage: fromRegistry.homepage,
            regError: fromRegistry.error,
            pkgError: modulePackageJson.error,

            // versions
            latest: latest,
            installed: versionToUse,
            isInstalled: packageIsInstalled,
            notInstalled: !packageIsInstalled,
            packageWanted: versionWanted,
            packageJson: packageJsonVersion,

            // Missing from package json
            notInPackageJson: foundIn(missingFromPackageJson[moduleName]),

            // meta
            devDependency: _.has(cwdPackageJson.devDependencies, moduleName),
            usedInScripts: _.findKey(cwdPackageJson.scripts, function (script) {
                return script.indexOf(moduleName) !== -1;
            }),
            mismatch: semver.validRange(packageJsonVersion) && semver.valid(versionToUse) && !semver.satisfies(versionToUse, packageJsonVersion),
            semverValid: semver.valid(versionToUse),
            easyUpgrade: semver.validRange(packageJsonVersion) && semver.valid(versionToUse) && semver.satisfies(latest, packageJsonVersion) && bump !== 'major',
            bump: bump,

            unused: unused
        };
    });
}

module.exports = createPackageSummary;