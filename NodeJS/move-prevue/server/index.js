const Koa = require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const { connect } = require('./databse/init')

;(async () => {
    await connect()
})();

const app = new Koa()

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