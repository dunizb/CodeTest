## 基本配置和入口出口

package.json
```js
"devDependencies": {
    "webpack": "^3.6.0"
}
```

webpack.config.js
```js
const path = require('path');

module.exports = {
    entry: {
        entry: "./src/entry.js",
        entry2: "./src/entry2.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {},
    plugins: [],
    devServer: {}
}
```