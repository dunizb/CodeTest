## 打包和分离Less

依赖：
`less: npm i --save-dev less@2.7.2`
`less-loader: npm i --save-dev less-loader@4.0.5`

配置：
```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                },{
                    loader: "less-loader"
                }]
            })
        }
    ]
}
```