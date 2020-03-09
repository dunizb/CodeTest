'use strict';

var chalk = require('chalk');

function debug() {
    console.log(chalk.green('[npm-check] debug'));
    console.log.apply(console, arguments);
    console.log('' + chalk.green('==============================='));
}

module.exports = debug;