const Router = require('koa-router')
const gravatar = require('gravatar')
const router = new Router()

const {enbctrypt} = require('../../utils/index')

// 引入User
const User = require('../../models/User')

// test
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'users success' }
})

// 注册
router.post('/register', async ctx => {
    const body = ctx.request.body
    const findResult = await User.find({ email: body.email })
    if(findResult.length > 0) {
        ctx.status = 500
        ctx.body = { "email": "邮箱已被占用" }
    } else {
        const avatar = gravatar.url(body.email, {s: '200', r: 'pg', d: 'mm'}); // mm 为默认头像
        const newUser = new User({
            name: body.name,
            password: enbctrypt(body.password),
            email: body.email,
            avatar
        })
        
        // 存储到数据库
        await newUser.save().then(user => {
            ctx.body = user
        }).catch(err => {
            console.log(err)
        })
        ctx.body = newUser;
    }
})

module.exports = router.routes()
