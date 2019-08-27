const Router = require('koa-router')
const router = new Router()

router.get('/book', (ctx, next) => {
    ctx.body = {
        data: 'JavaScript权威指南'
    }
})

module.exports = router