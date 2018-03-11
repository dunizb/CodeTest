## 图片迈坑：CSS分离与图片路径处理

依赖
for webpack 3：`npm i --save-dev extract-text-webpack-plugin@3.0.2`
for webpack 2：`npm i --save-dev extract-text-webpack-plugin@2.1.2`

配置
```js
const extractTextPlugin = require('extract-text-webpack-plugin');

rules: [
    {
        test: /\.css$/, 
        use: extractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
    }
]
```