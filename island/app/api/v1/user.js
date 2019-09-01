const bcryptjs = require('bcryptjs')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user'
})

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

router.post('/register/', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    // 加密的盐
    // const salt = bcryptjs.genSaltSync(10)
    // const safePwd = bcryptjs.hashSync(v.get('body.password1'), salt)
    const user = {
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: v.get('body.password1')
    }
    User.create(user)
})

module.exports = router