const mongoose = require('mongoose')
const Koa = require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const { connect, initSchemas } = require('./databse/init')

;(async () => {
    await connect()
    initSchemas()

    const Movies = mongoose.model('Movie')
    const movies = await Movies.find({})
    console.log('movies', movies)
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