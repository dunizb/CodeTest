'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = require('xtend');
var init = require('./init');
var debug = require('./debug');

var defaultOptions = {
    update: false,
    updateAll: false,
    global: false,
    cwd: process.cwd(),
    skipUnused: false,

    ignoreDev: false,
    devOnly: false,
    forceColor: false,
    saveExact: false,
    specials: '',
    debug: false,
    emoji: true,
    spinner: false,
    installer: 'npm',
    ignore: [],

    globalPackages: {},
    cwdPackageJson: { devDependencies: {}, dependencies: {} },

    packages: false,
    unusedDependencies: false,
    missingFromPackageJson: {}
};

function state(userOptions) {
    var currentStateObject = extend(defaultOptions);

    function get(key) {
        if (!currentStateObject.hasOwnProperty(key)) {
            throw new Error('Can\'t get unknown option "' + key + '".');
        }
        return currentStateObject[key];
    }

    function set(key, value) {
        if (get('debug')) {
            debug('set key', key, 'to value', value);
        }

        if (currentStateObject.hasOwnProperty(key)) {
            currentStateObject[key] = value;
        } else {
            throw new Error('unknown option "' + key + '" setting to "' + (0, _stringify2.default)(value, false, 4) + '".');
        }
    }

    function inspectIfDebugMode() {
        if (get('debug')) {
            inspect();
        }
    }

    function inspect() {
        debug('current state', all());
    }

    function all() {
        return currentStateObject;
    }

    var currentState = {
        get: get,
        set: set,
        all: all,
        inspectIfDebugMode: inspectIfDebugMode
    };

    return init(currentState, userOptions);
}
module.exports = state;