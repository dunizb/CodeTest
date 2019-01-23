## HTML文件打包

依赖
```js
npm i html-webpack-plugin@3.0.4 --save-dev
```

配置
```js
const htmlPlugin = require('html-webpack-plugin');

plugins: [
    new uglify(),
    new htmlPlugin({
        minify: {
            removeAttributeQuotes:true
        },
        hash: true,
        template: './src/index.html'
    })
]
```