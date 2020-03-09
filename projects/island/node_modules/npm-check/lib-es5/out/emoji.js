'use strict';

var emoji = require('node-emoji');

var emojiEnabled = true;

function output(name) {
    if (emojiEnabled) {
        return emoji.emojify(name);
    }

    return '';
}

function enabled(val) {
    emojiEnabled = val;
}

module.exports = output;
module.exports.enabled = enabled;