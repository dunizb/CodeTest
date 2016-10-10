/**
 * 后台   // 后端
 *  
 */
const express = require('express')
const router = module.exports = express.Router()
const Post = require('../models/post.js')
const Comment = require('../models/comment.js')

// 设置前缀
router.prefix = '/admin'

/**
 * 首页
 * GET /admin/index
 */
router.get('/index', (req, res) => {
    // 0.这里是后台管理，需要先判断用户是否登陆
    if (!req.session.userinfo) {
        return res.redirect('/sign.html')
    }
    console.log(000);
    Post.findCount((err, count) => {
        if (err) throw err
        res.locals.count = Math.ceil(count / 10)
        console.log(11);
        // 1.拿数据
        Post.findLimit(1, 10, (err, posts) => {
            console.log(222);
            // 2.渲染模板
            res.locals.user = req.session.userinfo
            res.locals.posts = posts
            res.locals.nowPage = 1 // 当前页面，默认第一页
                // console.log(posts[0]);
            res.render('index')
        })
    })
})

/**
 * GET /admin/index/:page
 *   获取分页数据
 */
router.get('/index/:page', (req, res) => {
    let nowPage = parseInt(req.params.page) // 当前面
    Post.findLimit(nowPage, 10, (err, posts) => {
        if (err) throw err
        if (!posts) {
            return res.send({ err_msg: 'err' }) }
        res.send(posts)
    })
})

/**
 * POST /index/:id
 * 这里保存数据
 */

router.post('/index/:id', (req, res) => {
    //id,slug,title,excerpt,content,type,status,comment_status,comment_count,view_count,created,modified,user_id,parent_id
    // let post = new Post(req.params.id)
    // post.title = req.body.title
    // post.content = req.body.content
    // 根据id获取想要的数据
    Post.findOneById(req.params.id, (err, post) => {
        post.title = req.body.title
        post.content = req.body.content
        post.save((err, result) => {
            if (err) throw err
            result ? res.send({ err_msg: 'ok' }) : res.send({ 'err_msg': 'err' })
        })
    })
})

/**
 * delete /index/:id
 */

router.post('/post/:id', (req, res) => {
    Post.findOneById(req.params.id, (err, post) =>{
        // post.save((err , result) =>{
        //     if(err) throw err
        //     result?res.send({err_msg:'ok'}): res.send({'err_msg':'err'})
        // })
        post.delete((err, result) => {
            if(err) throw err
              console.log(result);
            result ? res.send({ err_msg: 'ok' }) : 
                     res.send({ 'err_msg': 'err' })
     })
    })
})

/**
 * GET /index/search/:title
 */
router.get('/index/search/:title', (req, res) => {
    // 根据标题搜索文章
    Post.search(req.params.title, (err, posts) => {
        if (err) throw err
        if (!posts) return res.send({ err_msg: 'err' })
        res.send(posts)
    })
})


/*
 * GET /comments
 * 处理评论
 */

router.get('/comments', (req ,res) => {
    // 获取分页列表的数据，默认获取第一页
    Comment.findLimit(1,10 ,(err , comments) =>{
        res.locals.comments = comments
        res.render('comments')
    })
})

/**
 * POST /comments/:id
 */
router.post('/comments/:id' , (req ,res) => {
    console.log(0);
    // 1.先根据id获取最新的值
    let comment = new Comment(req.params.id)
    comment.findById(( err , commet) => {
        console.log(1);
        // 把需要更改的值添加上去
        comment.status = req.body.status
        comment.content = req.body.content
         // 最后执行保存操作
         comment.save( (err , result ) =>{
            console.log(2);
            result? res.send({err_msg:'ok'}):
            res.send({err_msg:'err'})
         })
    })
    
})

/**
 * POST /comments/delete/:id
 * 删除 
 */
router.post('/comments/delete/:id', (req, res) =>{
    let comment = new Comment(req.params.id)
    comment.findById((err, comment) => {
        comment.delete((err , result ) =>{
            result ? res.send({err_msg:'ok'}):
            res.send({err_msg:'err'})
        })
    })
})