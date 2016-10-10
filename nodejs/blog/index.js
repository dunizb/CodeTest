'use strict';
// blog是项目根目录
//  静态资源:www,public,static
// 启动

// 引入express框架
const express = require('express')
const app = express()


// 处理请求参数
const bodyParser = require('body-parser')

// 设置项目中使用的模板引擎
// 设置模板引擎所在目录,设置之后在render可以直接使用模板引擎的名字
app.set('views','./views')
// 第二个参数是我们使用的模板引擎
app.set('view engine','xtpl')


// glob ,用于匹配不同类型的文件.
const glob = require('glob')

// 路径处理
const path = require('path')

// session
const session = require('express-session')



// 加入bodyParser中间件
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// 引入一些中间件
// app.use
// 处理静态资源,也可以称之为路由   /account/sign
app.use(express.static(path.join(__dirname,'www')))
// var require

// 设置session中间件
// app.set('trust proxy', 1) // trust first proxy 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
    cookie:{maxAge:200000}
}))

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
     // /account/sign
     app.use(tmp.prefix, tmp)
 
})

// 统一处理404
app.use((req, res, next) => {
    res.status(404)
    //.send('我是404')
    // res.render('')
    // 跳转到新页面,让客户端重新请求一个指定的页面
    // 其实是设置了Location:/404.html这个响应头.
    res.redirect('/404.html')
    // res.writeHeader(302,'Location','/404.html')
})

// 统一处理服务器端错误
// app.use((err ,req, res, next) =>{
//   res.status(500).send('服务器错误了')
// })

// 监视服务
app.listen(3001, (err) => {
    if(err) throw err;
    console.log('http://127.0.0.1:3001/index/1');
})