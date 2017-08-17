//https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'js/[name]-bundle.js',
    },
    module:{
        loaders:[
            {
                test: '/\.js$/', loader: 'babel',
                /****性能优化*****/
                exclude: __dirname+'./node_modules/', //排除此目录
                include: __dirname+'./src/',  //只包含src目录
                /****性能优化*****/
                query:{
                    presets: ['latest'] //也可以在package.js中配置或者.baelrtc中配置
                }
            }
        ]
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