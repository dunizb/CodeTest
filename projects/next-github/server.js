const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./server/auth')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

// 创建Redis Client
const redis = new Redis({
    password: 123456
})

// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // 用于给session加密
    server.keys = ['Dunizb develop Github App']
    const SESSION_CONFIG = {
        key: 'jid', // 设置到浏览器的cookie里的key
        // maxAge: 10 * 1000,
        store: new RedisSessionStore(redis)
    }
    // server.use(session(SESSION_CONFIG, server))
    // server.use(async (ctx, next) => {
    //     console.log(`session is ${JSON.stringify(ctx.session)}`)
    //     next()
    // })

    // 配置处理github OAuth登录
    // auth(server)

    router.get('/api/user/info', async ctx => {
        const user = ctx.session.userInfo
        console.log('userInfo ==>', user)
        if (!user) {
            ctx.status = 401
            ctx.body = 'Need Login'
        } else {
            ctx.body = user
            ctx.set('Content-Type', 'application/json')
        }
    })

    server.use(router.routes())

    server.use(async (ctx, next) => {
        ctx.req.session = ctx.session
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listen on 3000')
    })
})
