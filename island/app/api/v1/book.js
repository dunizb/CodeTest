const Router = require('koa-router')
const router = new Router()

const {PositiveIntegerValidator} = require('../../validators/validator')

router.get('/book/:id', (ctx, next) => {
    ctx.body = {
        id: ctx.params.id,
        name: 'JavaScript权威指南'
    }
})

router.post('/book/:id', async (ctx, next) => {
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