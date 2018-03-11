## 服务和热更新

package.json
```js
"devDependencies": {
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.8.2"
}
```

webpack.config.js
```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    cost: "127.0.0.1",
    port: 8081
}
```

