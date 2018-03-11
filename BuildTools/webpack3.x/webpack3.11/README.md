## 消除无用的CSS

依赖插件：`npm i --save-dev purifycss-webpack purify-css`

引入
- `const glob = require('glob');`
- `const PurifyCSSPlugin = require('purifycss-webpack');`

处理Sass配置：
```js
plugins: [
    new uglifyJS(),
    new htmlPlugin({
        minify: {
            removeAttributeQuotes:true
        },
        hash: true,
        template: './src/index.html'
    }),
    new ExtractTextPlugin("css/index.css"),
    new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
]
```