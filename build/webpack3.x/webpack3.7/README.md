## HTML中图片处理

```js
module: {
    rules: [
        {
            test: /\.css$/, 
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },{
            test: /\.(png|jpg|gif)/,
            use: [{
                loader: 'url-loader',
                options:{
                    limit: 500, // 小于5000字节的图片生成base64格式
                    outputPath: "images/"
                }
            }]
        },{
            test: /\.(html|htm)$/i,
            use: ['html-withimg-loader']
        }
    ]
}
```    

