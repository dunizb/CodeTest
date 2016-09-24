// 写一些具体的配置
var path = require('path'); // 这个是对路径处理的模块,是node中的模块

module.exports={
    // entry属性用来指定我们项目的入口文件
    entry: path.resolve(__dirname,'7.CommonBox.jsx'),
    // output属性用来指定文件的输出路径
    output:{
        // path属性是指定的输出目录
        path:__dirname,
        // filename指定的是输出的文件名
        filename:'7.bundle.js'
   },
   module:{
        // 加载器,loaders,
        loaders:[
            {
                test:/\.jsx$/,  // 写正则指定我们要处理的文件 
                // 在匹配时去除指定路径
                exclude:/node_modules/,
                loader:'babel-loader', //  这里的loader指定要对文件做的事情,可以不写  -loader,每一个loader都是一个npm 包,需要单独去下载
                // `npm install --save-dev babel-loader`
                query:{ // 这里指定当前loader所需要的一些参数
                    presets:['react'] // 这里的react也需要单独安装:`babel-preset-react`
                }
                // query属性也可以这么去写:
                // loader:'babel-loader?presets[]=react'
            }
        ]
   }
}