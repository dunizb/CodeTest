const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules:[
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                options: {
                    "presets": ["@babel/preset-env"]
                } 
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images',
                        limit: 2048
                    }
                }
            },{
                test: /\.scss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            importLoaders: 2,
                            modules: true // 开启模块化的CSS 
                        }
                    },
                    "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
                    "postcss-loader"
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    optimization: {
        splitChunksPlugin: {
            chunks: 'all',
            cacheGroups: {
                vendors: false,
                default: false
            }
        }
    },
    plugins: [
        // 打包后运行
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // 打包前清理dist目录
        new CleanWebpackPlugin()
    ]
}