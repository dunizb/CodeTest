'use strict';
// blog是项目根目录
//  静态资源:www,public,static
// 启动

// 引入express框架
const express = require('express')
const app = express()

// 

// 设置项目中使用的模板引擎
// 设置模板引擎所在目录,设置之后在render可以直接使用模板引擎的名字
app.set('views','./views')
// 第二个参数是我们使用的模板引擎
app.set('view engine','xtpl')


// glob ,用于匹配不同类型的文件.
const glob = require('glob')

const path = require('path')

// 引入一些中间件
// app.use
// 处理静态资源
app.use(express.static(path.join(__dirname,'www')))
// 动态网站/开头表示网站根目录
// /assets/css/sb-admin.css
// src('')

// glob

// 引入所有控制器 3.0方式 **
glob.sync('./controllers/*.js').forEach((item) => {
    // item就是匹配到的指定规则的文件的路径
    const tmp =   require(item)
    // 得到文件名
    // const prefix = path.basename(item,'.js')

    // /home
    // app.use('/' + prefix ,tmp)
    // console.log(item.prefix);
    // console.log(tmp);
    app.use(tmp.prefix, tmp)
})



// 监视服务
app.listen(3001, (err) => {
    if(err) throw err
    console.log('http://127.0.0.1:3001');
})