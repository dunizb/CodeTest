const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = 'Hi Dunizb'
})

app.listen(3000)