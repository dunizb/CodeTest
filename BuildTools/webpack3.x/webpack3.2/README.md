## loader打包CSS文件

依赖
```js
npm i style-loader@0.20.2 --save-dev
npm i css-loader@0.28.10 --save-dev
```

webpack.config.js
```js
module: {
    rules: [
        {
            test: /\.css$/, 
            use: ['style-loader', 'css-loader']
        }
    ]
}
```