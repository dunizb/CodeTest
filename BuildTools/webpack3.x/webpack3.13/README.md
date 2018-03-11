## 增加babel支持

loader安装：`npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react`

Loader配置：
```js
test: '/\.(jsx|js)$/',
use: {
    loader: 'babel-loader',
    options: {
        presets: ['es2015', 'react']
    }
},
exclude: /node_modules/
```

.babelrc配置
```js
{
    "presets":["react","es2015"]
}
```