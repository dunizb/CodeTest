//https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'js/[name]-bundle.js',
    },
    plugins:[
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: "body", //把script标签放在head标签中
            title: "webpack is good!", // 替换网页的title
        })
    ]
}