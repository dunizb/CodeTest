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
 console.log(User);

 // 设置前缀
 router.prefix = '/'

 /**
  * GET /user_id/slug
  * 得到文章的html页面
  */
 // 这这里slug是参数，.html是固定匹配的字符
  router.get('/:user_id/:slug.html', (req, res ) => {
     // 1.先查询相应的用户是否存在
     // 2.如果存在 ，根据用户id或者文件的slug得到 数据

     // 1.先查询相应的用户是否存
     User.findUser(req.params.user_id, (err, users) => {
        if(err) throw err
        // console.log(users);
       // 如果为null,给出404
        if(!users) return  res.status(404).send('没有数据')
       //
         // 得到博客的数据
        Post.findOne(req.params.user_id,req.params.slug, (err, post) => {
          if(err) throw err
          if(!post) return res.status(404).send('没有数据')
          // 通过模板引擎返回博客的数据
         res.locals.post = post
         console.log(post);
         res.render('postdetails')
        })
        

     })
  })