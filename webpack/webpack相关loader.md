### webpack
  - 自带的
    - 压缩的UglifyJsPlugin
    - 分离第三方库的 CommonsChunkPlugin

  - loaders (这些需要单独去安装)
    - babel-loader
      * babel-preset-react  (转换jsx)
      * babel-preset-es2015 (转换es6为es5)
      * babel-preset-state-0 (es7)
      * .............state-4

    - css-loader (将css载入到js)
    - style-loader(将js中的css应用于页面)
    - sass-loader(转换sass为css)
    - less-loader

    - url-loader (只能够处理css中写的图片)



