const Koa = require('koa')
const app = new Koa()
const initManager = require('./core/init')
const bodyParser =  require('koa-bodyparser')
initManager.initCore(app)



console.log('process.cwd()', process.cwd())
app.use(bodyParser())
app.listen(3001)