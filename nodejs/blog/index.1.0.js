'use strict';
// blog是项目根目录
//  静态资源:www,public,static
// 启动

// 引入express框架
const express = require('express')
const app = express()

// 引入所有控制器, 1.0方式
// const home = require('./controllers/home.js')
// const sign = require('./controllers/sign.js')

const path = require('path')

// 引入一些中间件
// app.use
// 处理静态资源
app.use(express.static(path.join(__dirname,'www')))

// src('')


// glob

// 引入所有控制器 2.0方式 
const arr = ['home','sign']
arr.forEach((item) => {
  let str = `./controllers/${item}.js`
  const route =  require(str)
  // 加载控制器文件中的中间件,2.0方式
  app.use('/'+item , route)
})

// 加载控制器文件中的中间件,1.0方式
// app.use('/home',home)
// app.use('/sign',sign)

// 监视服务
app.listen(3001, (err) => {
  if(err) throw err
  console.log('http://127.0.0.1:3001');
})