const mongoose = require('mongoose')
const Koa = require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const { connect, initSchemas, initAdmin } = require('./databse/init')

const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

; (async () => {
    await connect()

    initSchemas()

    await initAdmin()

    // require('./task/movie')
    // require('./task/api')
    // require('./task/trailer')
    // require('./task/qiniu')

    const app = new Koa()
    await useMiddlewares(app)

    app.listen(4455)
})();
