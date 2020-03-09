'use strict';

var chalk = require('chalk');
var _ = require('lodash');
var table = require('text-table');
var emoji = require('./emoji');

function uppercaseFirstLetter(str) {
    return str[0].toUpperCase() + str.substr(1);
}

function render(pkg, currentState) {
    var packageName = pkg.moduleName;
    var rows = [];

    var indent = '           ' + emoji('   ');
    var flags = currentState.get('global') ? '--global' : '--save' + (pkg.devDependency ? '-dev' : '');
    var upgradeCommand = 'npm install ' + flags + ' ' + packageName + '@' + pkg.latest;
    var upgradeMessage = chalk.green(upgradeCommand) + ' to go from ' + pkg.installed + ' to ' + pkg.latest;
    // DYLAN: clean this up
    var status = _([pkg.notInstalled ? chalk.bgRed.white.bold(emoji(' :worried: ') + ' MISSING! ') + ' Not installed.' : '', pkg.notInPackageJson ? chalk.bgRed.white.bold(emoji(' :worried: ') + ' PKG ERR! ') + ' Not in the package.json. ' + pkg.notInPackageJson : '', pkg.pkgError && !pkg.notInstalled ? chalk.bgGreen.white.bold(emoji(' :worried: ') + ' PKG ERR! ') + ' ' + chalk.red(pkg.pkgError.message) : '', pkg.bump && pkg.easyUpgrade ? [chalk.bgGreen.white.bold(emoji(' :heart_eyes: ') + ' UPDATE!  ') + ' Your local install is out of date. ' + chalk.blue.underline(pkg.homepage || ''), indent + upgradeMessage] : '', pkg.bump && !pkg.easyUpgrade ? [chalk.white.bold.bgGreen(pkg.bump === 'nonSemver' ? emoji(' :sunglasses: ') + ' new ver! '.toUpperCase() : emoji(' :sunglasses: ') + ' ' + pkg.bump.toUpperCase() + ' UP ') + ' ' + uppercaseFirstLetter(pkg.bump) + ' update available. ' + chalk.blue.underline(pkg.homepage || ''), indent + upgradeMessage] : '', pkg.unused ? [chalk.black.bold.bgWhite(emoji(' :confused: ') + ' NOTUSED? ') + (' ' + chalk.yellow('Still using ' + packageName + '?')), indent + ('Depcheck did not find code similar to ' + chalk.green('require(\'' + packageName + '\')') + ' or ' + chalk.green('import from \'' + packageName + '\'') + '.'), indent + 'Check your code before removing as depcheck isn\'t able to foresee all ways dependencies can be used.', indent + ('Use ' + chalk.green('--skip-unused') + ' to skip this check.'), indent + ('To remove this package: ' + chalk.green('npm uninstall --save' + (pkg.devDependency ? '-dev' : '') + ' ' + packageName))] : '', pkg.mismatch && !pkg.bump ? chalk.bgRed.yellow.bold(emoji(' :interrobang: ') + ' MISMATCH ') + ' Installed version does not match package.json. ' + pkg.installed + ' ≠ ' + pkg.packageJson : '', pkg.regError ? chalk.bgRed.white.bold(emoji(' :no_entry: ') + ' NPM ERR! ') + ' ' + chalk.red(pkg.regError) : '']).flatten().compact().valueOf();

    if (!status.length) {
        return false;
    }

    rows.push([chalk.yellow(packageName), status.shift()]);

    while (status.length) {
        rows.push([' ', status.shift()]);
    }

    rows.push([' ']);

    return rows;
}

function outputConsole(currentState) {
    var packages = currentState.get('packages');

    var rows = packages.reduce(function (acc, pkg) {
        return acc.concat(render(pkg, currentState));
    }, []).filter(Boolean);

    if (rows.length) {
        var renderedTable = table(rows, {
            stringLength: function stringLength(s) {
                return chalk.stripColor(s).length;
            }
        });

        console.log('');
        console.log(renderedTable);
        console.log('Use ' + chalk.green('npm-check -' + (currentState.get('global') ? 'g' : '') + 'u') + ' for interactive update.');
        process.exitCode = 1;
    } else {
        console.log(emoji(':heart:  ') + 'Your modules look ' + chalk.bold('amazing') + '. Keep up the great work.' + emoji(' :heart:'));
        process.exitCode = 0;
    }
}

module.exports = outputConsole;