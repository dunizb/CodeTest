const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

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
            }
        ]
    },
    plugins: [
        new uglify()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host: "127.0.0.1",
        port: 8081
    }
}