const Router = require('koa-router')
const router = new Router()

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
    if (true) {
        console.log('error')
        const error = new global.errs.ParameterException()
        throw error
    }
    ctx.body = {
        data: 'JavaScript权威指南'
    }
})

module.exports = router