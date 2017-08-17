//https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');
var loaderOptionsPlugin = require('loader-options-plugin');
var path = require('path');

module.exports = {
    context: __dirname,//上下文
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
                exclude: path.resolve(__dirname,'node_modules'), //排除此目录
                include: path.resolve(__dirname,'src'),  //只包含src目录
                /****性能优化*****/
                query:{
                    presets: ['latest'] //也可以在package.js中配置或者.baelrtc中配置
                }
            },
            {
                test: '/\.css$/', 
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader',
            }
        ]
    },
    postcss: [
        require('autoprefixer')({
            broswers: ['last 5 version']
        })
    ],
    plugins:[
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: "body", //把script标签放在head标签中
            title: "webpack is good!", // 替换网页的title
        })
    ]
}