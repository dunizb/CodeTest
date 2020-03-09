const Koa = require('koa')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    server.use(async (ctx, next) => {
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listen on 3000')
    })
})
