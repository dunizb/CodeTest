const Koa = require('koa')
const app = new Koa()
const initManager = require('./core/init')
const bodyParser = require("koa-bodyparser")
const catchError = require('./middlewares/exception')

app.use(catchError)
app.use(bodyParser())

initManager.initCore(app)

app.listen(3001)