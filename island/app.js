const Koa = require('koa')
const app = new Koa()
const initManager = require('./core/init')
const bodyParser = require("koa-bodyparser")
initManager.initCore(app)

const catchError = require('./middlewares/exception')
app.use(catchError)
app.use(bodyParser())


app.listen(3001)