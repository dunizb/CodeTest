'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var inquirer = require('inquirer');
var chalk = require('chalk');
var table = require('text-table');
var installPackages = require('./install-packages');
var emoji = require('./emoji');

var UI_GROUPS = [{
    title: chalk.bold.underline.green('Update package.json to match version installed.'),
    filter: { mismatch: true, bump: null }
}, {
    title: chalk.bold.underline.green('Missing.') + ' ' + chalk.green('You probably want these.'),
    filter: { notInstalled: true, bump: null }
}, {
    title: chalk.bold.underline.green('Patch Update') + ' ' + chalk.green('Backwards-compatible bug fixes.'),
    filter: { bump: 'patch' }
}, {
    title: chalk.yellow.underline.bold('Minor Update') + ' ' + chalk.yellow('New backwards-compatible features.'),
    bgColor: 'yellow',
    filter: { bump: 'minor' }
}, {
    title: chalk.red.underline.bold('Major Update') + ' ' + chalk.red('Potentially breaking API changes. Use caution.'),
    filter: { bump: 'major' }
}, {
    title: chalk.magenta.underline.bold('Non-Semver') + ' ' + chalk.magenta('Versions less than 1.0.0, caution.'),
    filter: { bump: 'nonSemver' }
}];

function label(pkg) {
    var bumpInstalled = pkg.bump ? pkg.installed : '';
    var installed = pkg.mismatch ? pkg.packageJson : bumpInstalled;
    var name = chalk.yellow(pkg.moduleName);
    var type = pkg.devDependency ? chalk.green(' devDep') : '';
    var missing = pkg.notInstalled ? chalk.red(' missing') : '';
    var homepage = pkg.homepage ? chalk.blue.underline(pkg.homepage) : '';
    return [name + type + missing, installed, installed && '❯', chalk.bold(pkg.latest || ''), pkg.latest ? homepage : pkg.regError || pkg.pkgError];
}

function short(pkg) {
    return pkg.moduleName + '@' + pkg.latest;
}

function choice(pkg) {
    if (!pkg.mismatch && !pkg.bump && !pkg.notInstalled) {
        return false;
    }

    return {
        value: pkg,
        name: label(pkg),
        short: short(pkg)
    };
}

function unselectable(options) {
    return new inquirer.Separator(chalk.reset(options ? options.title : ' '));
}

function createChoices(packages, options) {
    var filteredChoices = _.filter(packages, options.filter);

    var choices = filteredChoices.map(choice).filter(Boolean);

    var choicesAsATable = table(_.map(choices, 'name'), {
        align: ['l', 'l', 'l'],
        stringLength: function stringLength(str) {
            return chalk.stripColor(str).length;
        }
    }).split('\n');

    var choicesWithTableFormating = _.map(choices, function (choice, i) {
        choice.name = choicesAsATable[i];
        return choice;
    });

    if (choicesWithTableFormating.length) {
        choices.unshift(unselectable(options));
        choices.unshift(unselectable());
        return choices;
    }
}

function interactive(currentState) {
    var packages = currentState.get('packages');

    if (currentState.get('debug')) {
        console.log('packages', packages);
    }

    var choicesGrouped = UI_GROUPS.map(function (group) {
        return createChoices(packages, group);
    }).filter(Boolean);

    var choices = _.flatten(choicesGrouped);

    if (!choices.length) {
        console.log(emoji(':heart:  ') + 'Your modules look ' + chalk.bold('amazing') + '. Keep up the great work.' + emoji(' :heart:'));
        return;
    }

    choices.push(unselectable());
    choices.push(unselectable({ title: 'Space to select. Enter to start upgrading. Control-C to cancel.' }));

    var questions = [{
        name: 'packages',
        message: 'Choose which packages to update.',
        type: 'checkbox',
        choices: choices.concat(unselectable()),
        pageSize: process.stdout.rows - 2
    }];

    return new _promise2.default(function (resolve) {
        return inquirer.prompt(questions, resolve);
    }).then(function (answers) {
        var packagesToUpdate = answers.packages;

        if (!packagesToUpdate || !packagesToUpdate.length) {
            console.log('No packages selected for update.');
            return false;
        }

        var saveDependencies = packagesToUpdate.filter(function (pkg) {
            return !pkg.devDependency;
        }).map(function (pkg) {
            return pkg.moduleName + '@' + pkg.latest;
        });

        var saveDevDependencies = packagesToUpdate.filter(function (pkg) {
            return pkg.devDependency;
        }).map(function (pkg) {
            return pkg.moduleName + '@' + pkg.latest;
        });

        var updatedPackages = packagesToUpdate.map(function (pkg) {
            return pkg.moduleName + '@' + pkg.latest;
        }).join(', ');

        if (!currentState.get('global')) {
            if (saveDependencies.length) {
                saveDependencies.unshift('--save');
            }

            if (saveDevDependencies.length) {
                saveDevDependencies.unshift('--save-dev');
            }
        }

        return installPackages(saveDependencies, currentState).then(function (currentState) {
            return installPackages(saveDevDependencies, currentState);
        }).then(function (currentState) {
            console.log('');
            console.log(chalk.green('[npm-check] Update complete!'));
            console.log(chalk.green('[npm-check] ' + updatedPackages));
            console.log(chalk.green('[npm-check] You should re-run your tests to make sure everything works with the updates.'));
            return currentState;
        });
    });
}

module.exports = interactive;