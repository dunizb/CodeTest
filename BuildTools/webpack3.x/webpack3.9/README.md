## 处理和分离Sass

依赖：`npm i --save-dev node-sass sass-loader`

处理Sass配置：
```js
module: {
    rules: [
        {
            test: /\.scss/,
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader'
            },{
                loader: 'sass-loader'
            }]
        }
    ]
}
```

分离Sass配置
```js
module: {
    rules: [
        {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                },{
                    loader: 'sass-loader'
                }],
                fallback: 'style-loader'
            })
        }
    ]
}
```