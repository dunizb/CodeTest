const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/book'
})

const {PositiveIntegerValidator} = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
router.get('/laste', new Auth().m, (ctx, next) => {
    ctx.body = ctx.auth.uid
})

router.post('/:id', async (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    const v = new PositiveIntegerValidator().validate(ctx)
    ctx.body = {
        data: 'JavaScript权威指南',
        path,
        query,
        headers,
        body
    }
})

module.exports = router