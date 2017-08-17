var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/js/animate.js','./src/js/common.js']
    },
    output: {
        path: __dirname+'/dist',
        filename: 'js/[name].bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            filename: "index-[hash].html",
            template: "index.html",
            inject: "head" //把script标签放在head标签中
        })
    ]
}