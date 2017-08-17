//https://www.npmjs.com/package/html-webpack-plugin
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        animate: './src/js/animate.js',
        common: './src/js/common.js',
        a: './src/js/a.js',
        b: './src/js/b.js',
        c: './src/js/c.js'
    },
    output: {
        path: __dirname+'/dist',
        filename: 'js/[name]-[chunkhash].js',
        //公共路径，比如CDN，输出：http://imgsf.cdn/js/common-541364f0428eb19b63e3.js
        //https://doc.webpack-china.org/guides/public-path/
        publicPath: "http://imgsf.cdn/",    
    },
    plugins:[
        // new htmlWebpackPlugin({
        //     // filename: "index-[hash].html",
        //     template: "index.html",
        //     // inject: "head", //把script标签放在head标签中
        //     inject: false,
        //     title: "webpack is good!", // 替换网页的title
        //     nowTime: Date.now(),
        //     //https://github.com/kangax/html-minifier#options-quick-reference
        //     minify: {   //压缩
        //         removeComments: true, //删除注释
        //         collapseWhitespace: true, //删除空格
        //     }
        // }),
        new htmlWebpackPlugin({
            filename: "a.html",
            template: "index.html",
            // inject: "head", //把script标签放在head标签中
            inject: "body",
            title: "pageA webpack is good!", // 替换网页的title
            chunks:['animate','common'], //只包含需要的东西
            excludeChunks: ['b','c'], //允许跳过一些模块（排除）
        }),
        new htmlWebpackPlugin({
            filename: "b.html",
            template: "index.html",
            inject: "body", //把script标签放在head标签中
            title: "pageB webpack is good!", // 替换网页的title
            chunks:['a','b']
        }),
        new htmlWebpackPlugin({
            filename: "c.html",
            template: "index.html",
            inject: "body", //把script标签放在head标签中
            title: "pageC webpack is good!", // 替换网页的title
            chunks:['c']
        })
    ]
}