module.exports = (isDev) => {
  return {
    // 去掉template中的空格
    preserverWhitepace: true,
    // 单独打包Vue中的CSS
    extractCss: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false, // 根据环境变量生成
    loaders: {},
    preLoader: {},
    postLoader: {}
  }
}
