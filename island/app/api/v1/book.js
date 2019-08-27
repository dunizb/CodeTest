const Router = require('koa-router')
const router = new Router()

const { HttpException } = require('../../../core/http-exception')

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
    if (!query.version) {
        console.log('error')
        const error = new HttpException('为什么出错误', 10001, 400)
        // error.requestUrl = `${ctx.method} ${ctx.path}`
        throw error
    }
    ctx.body = {
        data: 'JavaScript权威指南',
        path,
        query,
        headers,
        body
    }
    // throw new Error('API Exception!!')
})

module.exports = router