const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const views = require('koa-views')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))
app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Look',
        me: 'Dunizb'
    })
})

app.listen(4455)