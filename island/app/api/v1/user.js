const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user'
})

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

router.post('/register/', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: v.get('body.password1')
    }
    User.create(user)
})

module.exports = router