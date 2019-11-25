const koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const Router = require('koa-router')
const path = require('path')
const router = new Router()
const app = new koa()

app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, 'public/uploads'),
        // 保留文件扩展名
        keepExtensions: true,
    }
}));

router.post('/upload', ctx => {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
})
app.use(router.routes());


app.listen(3001, () => {
    console.log('启动成功')
    console.log('http://localhost:3001')
});