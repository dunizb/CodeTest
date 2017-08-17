//https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        animate: './src/js/animate.js',
        common: './src/js/common.js'
    },
    output: {
        path: __dirname+'/dist',
        filename: 'js/[name]-[chunkhash].js',
        //公共路径，比如CDN，输出：http://imgsf.cdn/js/common-541364f0428eb19b63e3.js
        //https://doc.webpack-china.org/guides/public-path/
        publicPath: "http://imgsf.cdn/",    
    },
    plugins:[
        new htmlWebpackPlugin({
            // filename: "index-[hash].html",
            template: "index.html",
            // inject: "head", //把script标签放在head标签中
            inject: false,
            title: "webpack is good!", // 替换网页的title
            nowTime: Date.now(),
            //https://github.com/kangax/html-minifier#options-quick-reference
            minify: {   //压缩
                removeComments: true, //删除注释
                collapseWhitespace: true, //删除空格
            }
        })
    ]
}