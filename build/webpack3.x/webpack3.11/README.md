## PostCss 自动处理CSS3属性前缀

依赖loader：`npm i --save-dev postcss-loader autoprefixer`

新建postcss.config.js
```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

配置，修改CSS Loader处，增加postcss配置：
```js
module: {
    rules: [
        {
            test: /\.css$/, 
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            })
        }
    ]
}
```