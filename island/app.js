const Koa = require('koa')
const initManager = require('./core/init')
const bodyParser = require("koa-bodyparser")
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(catchError)
app.use(bodyParser())

initManager.initCore(app)

app.listen(3001)