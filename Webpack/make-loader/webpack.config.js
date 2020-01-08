const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders'],  // 当你引用一个Loader的时候它会先去查找node_modules，如果找不到再去./loaders找
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
                    loader: 'replaceLoaderAsync'
                },
                {
                    // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                    loader: 'replaceLoader',
                    options: {
                        origin: 'http',
                        replace: 'https'
                    }
                }
            ]
        }]
    }
}

// {
//     // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
//     loader: 'replaceLoaderAsync',
//     options: {
//         origin: 'http',
//         replace: 'https'
//     }
// },