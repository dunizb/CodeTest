// webpack的配置文件

var path = require('path')

// var gulp = require('gulp')
var webpack = require('webpack') 

// 自动打开浏览器插件
var openBrowserPlugin = require('open-browser-webpack-plugin')

module.exports={
  // 指定一个入口文件
  // entry:path.resolve(__dirname,'index.jsx'),
  
  // 指定多个入口
  entry:{ // 这个对应的属性就对应一个个的文件
    app : path.resolve(__dirname,'index.jsx'),
    // 如果有一共多个页面共用的库，可以单独打包
    myreact:['react','react-dom']
  }
,
  // output指定文件的输出路径
  output:{
    path:__dirname,
    filename:'bundle.js'
  },
  module:{
    loaders:[
        // 对js进行处理的loaders
        {
          test:/\.jsx$/,   // 指定要处理的文件
          exclude: /node_modules/ ,    // 指定要忽略的目录
          loader:'babel',  // 也可以写成babel-loader
          query:{
            presets:['react','es2015'] 
            // 这里的react 和es2015都需要安装
            // npm install --save-dev  babel-preset-react
          }
          // .baberc
          //  {
          //    presets:['react','es2015']
          //  }
          //
        },
        // 对css进行处理loader : css-loader
        {
          test:/\.scss$/, //最初由哪个loader处理的就是匹配它需要的文件
          exclude:/node_modules/,
          // 这个css 仅仅是把css文件载入到js中
          // 如果写多个loader以!分隔，最终他们会【从右往左执行】
          loader:'style!css!sass'// 指定一个css-loader去处理css文件
        }
        // style-loader这个loader专门用来将js中载入的css应用于页面
        // 如果要对sass进行处理，需要使用sass-loader
        //    1.先把sass的代码转换成css,
        //    2.然后将转换后的css载入到js中
        //    3.将载入到js中的css应用于页面
        // 如果要对less进行处理，需要使用less-loader
        , // url-loader
        {
          // 判断如果图片比较小，就转换成base64
          // 是把css样式中的url中指定的图片进行转换.
          test:/\.(jpg|jpeg|png|gif)$/,   // 匹配图片，因为我们是要对图片进行处理
          // limit 参数，给定一个值(bit)当图片小于该值时会被转base64编码的形式,否则会被复制到
          // name参数指定的位置,[name] 表示原文件名,[ext]原文件的扩展路径
          loader:'url?limit=10000&name=./newImg/[name].[ext]'  // 单位bit
          //   1字节: 8 bit
          //   1kb : 1024 字节
          //   1M : 1024kb
        }
    ]
  }
  ,plugins:[
    // 要进行优化
    // 第一个参数是我们是entry属性里写的一个属性。
    // 第二个参数，指定，我们最终要输出的文件的路径。
    new webpack.optimize.CommonsChunkPlugin('myreact','myreact.js'),
    new webpack.optimize.UglifyJsPlugin({
       output:{
        comments:false // 去除注释
       },
       compress:{
         warnings:false // 去除警告
       }
    }),
    new openBrowserPlugin({
      url:'http://localhost:8080/index.html'
    })
  ]
}