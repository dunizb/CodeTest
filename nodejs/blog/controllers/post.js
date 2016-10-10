/**
 * 博客详情页
 *   博客内容
 *   评论
 *  
 */
 const express = require('express')
 const router = module.exports = express.Router()
 const User = require('../models/user.js')
 const Post = require('../models/post.js')
 const Comment  = require('../models/comment.js')
 console.log(User);

 // 设置前缀
 router.prefix = '/'

 /**
  * GET /user_id/slug.html
  * 得到文章的html页面
  */
 // 这这里slug是参数，.html是固定匹配的字符
  router.get('/:user_id/:slug.html', (req, res , next) => {
     // 1.先查询相应的用户是否存在
     // 2.如果存在 ，根据用户id或者文件的slug得到 数据

     // 1.先查询相应的用户是否存
     User.findUser(req.params.user_id, (err, users) => {
        if(err) throw err
        // console.log(users);
       // 如果为null,给出404
        if(!users) return next()
       //
         // 得到博客的数据
        Post.findOne(req.params.user_id,req.params.slug, (err, post) => {
          if(err) throw err
          if(!post) return next()
          // 通过模板引擎返回博客的数据
         res.locals.post = post
         console.log(post);
         res.render('postdetails')
        })
     })
  })

  /**
   * GET user_id/slug
   * 这个是得到的json数据返回
   */
   router.get('/:user_id/:slug', (req, res , next) => {
     // 1.先查询相应的用户是否存在
     // 2.如果存在 ，根据用户id或者文件的slug得到 数据

     // 1.先查询相应的用户是否存
     User.findUser(req.params.user_id, (err, users) => {
        if(err) throw err
        // console.log(users);
       // 如果为null,给出404
        if(!users) return next()
       //
         // 得到博客的数据
        Post.findOne(req.params.user_id,req.params.slug, (err, post) => {
          if(err) throw err
          if(!post) return next()
          // 通过模板引擎返回博客的数据
         res.locals.post = post
         console.log(post);
         res.send(post)
         // res.render('postdetails')
        })
     })
  })

 /**
  * GET /comments
  * 获取所有评论
  */
 router.get('/comments', (req, res,next) =>{
    // 1.调用评论对应的model,得到数据
// 404不是错误
    Comment.find((err, comments) =>{
      if(err) throw err
      if(!comments) return next()

      res.send(comments)
    })
    // 2.直接返回json数据
 })

 /**
  * POST /comments
  * 接收并保存评论
  */
router.post('/comments', (req, res) =>{
   // body-parser , req.body
   // 客户端传来的都是不可信
   // 1.调用model保存数据
   //id,author,author_email,author_ip,content,status,support,oppose,created ,post_id,parent_id,user_id
   // req.ip 可以获取客户端的Ip
   let comment = new Comment(
     null,req.body.author,req.body.email,req.ip,req.body.content,null,0,0,null,1,0,1
    )
   comment.save((err,result) =>{
     result?res.send({err_msg:'ok'}):
      res.send({err_msg:'err'})
   })
})
