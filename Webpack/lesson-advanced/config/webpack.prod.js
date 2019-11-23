const merge = require('webpack-merge');
const commonConfig = require('./webapck.common')

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map'
})
