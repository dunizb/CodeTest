const mongoose = require('mongoose')
const Koa = require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const { connect, initSchemas, initAdmin } = require('./databse/init')
const router = require('./routes')

;(async () => {
    await connect()

    initSchemas()

    await initAdmin()

    // require('./task/movie')
    // require('./task/api')
    // require('./task/trailer')
    // require('./task/qiniu')
})();

const app = new Koa()
app
    .use(router.routes())
    .use(router.allowedMethods())

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