'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var path = require('path');
var globalModulesPath = require('global-modules');
var readPackageJson = require('../in/read-package-json');
var globalPackages = require('../in/get-installed-packages');
var emoji = require('../out/emoji');
var fs = require('fs');
var chalk = require('chalk');

function init(currentState, userOptions) {
    return new _promise2.default(function (resolve, reject) {
        _.each(userOptions, function (value, key) {
            return currentState.set(key, value);
        });

        if (currentState.get('global')) {
            var modulesPath = globalModulesPath;

            if (process.env.NODE_PATH) {
                if (process.env.NODE_PATH.indexOf(path.delimiter) !== -1) {
                    modulesPath = process.env.NODE_PATH.split(path.delimiter)[0];
                    console.log(chalk.yellow('warning: Using the first of multiple paths specified in NODE_PATH'));
                } else {
                    modulesPath = process.env.NODE_PATH;
                }
            }

            if (!fs.existsSync(modulesPath)) {
                throw new Error('Path "' + modulesPath + '" does not exist. Please check the NODE_PATH environment variable.');
            }

            console.log(chalk.green('The global path you are searching is: ' + modulesPath));

            currentState.set('cwd', globalModulesPath);
            currentState.set('globalPackages', globalPackages(modulesPath));
        } else {
            var cwd = path.resolve(currentState.get('cwd'));
            var pkg = readPackageJson(path.join(cwd, 'package.json'));
            currentState.set('cwdPackageJson', pkg);
            currentState.set('cwd', cwd);
        }

        emoji.enabled(currentState.get('emoji'));

        if (currentState.get('cwdPackageJson').error) {
            return reject(currentState.get('cwdPackageJson').error);
        }

        return resolve(currentState);
    });
}

module.exports = init;