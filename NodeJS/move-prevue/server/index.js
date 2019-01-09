const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = '电影预告片'
})

app.listen(4455)