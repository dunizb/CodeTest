const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyrightWebpackPlugin()
    ]
}