/**
 * 用户账号相关
 *   登陆
 *   注册
 *   注销
 *   找回密码
 */
const express = require('express')
const router = module.exports = express.Router()
const User = require('../models/user.js')

// 设置前缀
router.prefix = '/account'
// 127.0.0.1/signin

/**
 * POST /account/signin
 * 会同时判断请是否是post类型,并且判断后缀是否是/signin
 */
router.post('/signin', (req, res ) => {
    // 拿数据，返回数据
    
  // req.body
    // 1.根据用户名密码，查到用户信息
    User.findOne(req.body.username,req.body.password, (err, user) => {
      if(err) throw err
      if(!user) return res.send({err_msg:'err'})
        
      // 此时说明用户名密码是正确的,// 每一个用户之前不共享res.session.userinfo值
      req.session.userinfo=user

      res.send({err_msg:'ok'})
    })

  // 判断用户名密码是否与服务中的相等
  // 如果相等就设置session
  // 引入express-session中间件之后会多一个session属性
  // console.log(req.session);
  // // if(!req.session.test){ res.redirec('/登陆页面.html')}
  // // 
  // // req.session.test = 'username=xxx;pwd=222'
  // // 一般在session在存储用户信息
  // let user = {name:'xiaoming',pwd:'12121'}
  // // 每个用户不共享session值.
  // req.session.userinfo = user
  // res.send('ok')
})


/**
 * POST /account/signout
 * 注销
 */
router.post('/signout', (req, res) => {
  // req.session.userinfo
  delete req.session.userinfo
  res.send({err_msg : 'ok'})
})

router.get('/signout', (req, res) => {
  // req.session.userinfo
  delete req.session.userinfo
  res.redirect('/sign.html')
})

/**
 * POST /account/signup
 * 注册
 */

/**
 * POST /account/refind
 * 找回密码
 */

