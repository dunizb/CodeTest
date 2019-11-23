const webpack = require('webpack')
const merge = require('webpack-merge');

const commonConfig = require('./webapck.common')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        port: 8090, // 运行服务的端口，默认为8080
        open: true,  // 自动打开浏览器运行
        hot: true,
        hotOnly: true
    },
    optimization: {
       usedExports: true    // Tree Shaking
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

