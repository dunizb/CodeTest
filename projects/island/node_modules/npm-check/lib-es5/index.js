'use strict';

var npmCheck = require('./in');
var createState = require('./state/state');

function init(userOptions) {
    return createState(userOptions).then(function (currentState) {
        return npmCheck(currentState);
    });
}

module.exports = init;