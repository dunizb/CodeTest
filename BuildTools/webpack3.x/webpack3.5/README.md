## CSS中的图片处理

依赖
```js
npm i html-webpack-plugin@3.0.4 --save-dev
```

配置
```js
module: {
    rules: [
        {
            test: /\.(png|jpg|gif)/,
            use: [{
                loader: 'url-loader',
                options:{
                    limit: 5000, // 小于5000字节的图片生成base64格式
                }
            }]
        }
    ]
}
```