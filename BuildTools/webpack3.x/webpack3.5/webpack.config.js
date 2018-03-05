const path = require('path');
const uglifyJS = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        entry: "./src/entry.js",
        entry2: "./src/entry2.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },{
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 5000, // 小于5000字节的图片生成base64格式
                    }
                }]
            }
        ]
    },
    plugins: [
        new uglifyJS(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes:true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host: "127.0.0.1",
        port: 8081
    }
}