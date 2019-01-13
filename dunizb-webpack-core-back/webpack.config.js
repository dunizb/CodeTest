const path = require('path');
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            loader: path.resolve('./loader/index.js')
        }]
    }
}