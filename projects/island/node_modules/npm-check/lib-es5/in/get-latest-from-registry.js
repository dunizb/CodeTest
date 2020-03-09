'use strict';

var _ = require('lodash');
var bestGuessHomepage = require('./best-guess-homepage');
var semver = require('semver');
var packageJson = require('package-json');
var cpuCount = require('os').cpus().length;
var throat = require('throat')(cpuCount);

function getNpmInfo(packageName) {
    return throat(function () {
        return packageJson(packageName, { fullMetadata: true, allVersions: true });
    }).then(function (rawData) {
        var CRAZY_HIGH_SEMVER = '8000.0.0';

        var sortedVersions = _(rawData.versions).keys().remove(_.partial(semver.gt, CRAZY_HIGH_SEMVER)).sort(semver.compare).valueOf();

        var latest = rawData['dist-tags'].latest;
        var next = rawData['dist-tags'].next;
        var latestStableRelease = semver.satisfies(latest, '*') ? latest : semver.maxSatisfying(sortedVersions, '*');
        return {
            latest: latestStableRelease,
            next: next,
            versions: sortedVersions,
            homepage: bestGuessHomepage(rawData)
        };
    }).catch(function (err) {
        var errorMessage = 'Registry error ' + err.message;
        return {
            error: errorMessage
        };
    });
}

module.exports = getNpmInfo;