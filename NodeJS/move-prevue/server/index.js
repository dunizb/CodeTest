const Koa = require('koa')
const app = new Koa()
const pug = require('pug')
const { pugTpl } = require('./tpl')

app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = pug.render(pugTpl, {
        you: 'Apple',
        me: 'Dunizb'
    })
})

app.listen(4455)