const Koa = require('koa')
const KoaRouter = require('koa-router')
const Mongoose = require('mongoose')
const KoaBodyParse = require('koa-bodyparser')

// 实例化koa
const app = new Koa()
const router = new KoaRouter()

// 引入users.js
const users = require('./routes/api/users')

// 路由
router.get('/', async ctx => {
    ctx.body = { msg: 'Hello Koa interface' }
})

// 链接数据库
Mongoose.connect("mongodb://localhost/study", {
    useNewUrlParser: true
}, () => {
    console.log('数据库链接成功.');
})

// 配置路由地址
router.use('/api/users', users)

app.use(KoaBodyParse())
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server started on ${port}`);
})

