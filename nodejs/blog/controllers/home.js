'use strict';

// 首页
//  - 文章列表
//  - 关于我们
//  - 联系我们

const express = require('express')
const home = module.exports =  new  express.Router()
const Post = require('../models/post.js')


// 设置访问前缀,只是一个,相当于没有前缀。
home.prefix='/'

// action
// /GET /index是首页, 假设首页是文章的列表
// /home/index 
home.get('/index', (req, res) => {
  // 1.在控制器里是调用Model得到数据
  // 2.然后通过View展示给用户.
  // 可以通过模板引擎来做,模板引擎需要一些模板文件
  // 我们是把数据填写到模板引擎中，生成最终的html文件
  // 然后把该文件读取出来响应给用户
     let posts = Post.find()
     // res.render把数据填到模板引擎中,然后会把结果返回给用户
     // 第一个参数就是模板引擎,
     // 第二个参数是模板引擎中使用的数据
     // 第二个参数是个对象,对象的属性可以直接在模板中使用
     // 方法1.
     // res.render('post',{name:'小明'})

     // 方法2.
     res.locals.posts = posts
     //xxx
     //locals.xx='afs'
     
     res.render('post')

     // send 可以发json对象
     // res.send(post)
})

// 分页
home.get('/index/:page' ,(req, res) =>{

  let page = parseInt(req.params.page)
  // console.log(page);
  // 调Model
  // let posts = Post.findPage(page)
  Post.findPage(page,function(posts){
    // 拿到数据渲染模板,返回给用户
    res.locals.posts = posts
    res.locals.page = page
    res.render('post') // 把模板转换为html字符返回
  })
  
})

home.get('/indexpage/:page',(req, res) => {
  let page = parseInt(req.params.page)
  // console.log(page);
  // 调Model
  // 回调的意义,数据不是同步获取
  let posts = Post.findPage(page,function(posts){
    res.send(posts)
  })
})


home.get('/about', (req, res) => {
  res.send('关于我们')
})

home.get('/concat', (req, res) => {
  res.send('联系我们')
})