const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const jsonError = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa()
const routing = require('./routes')
// 连接mongoose
const { connection } = require('./config')
mongoose.connect(connection, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true 
}, () => console.log('mongoose连接成功了！'))
mongoose.connection.on('error', console.error)

// Koa自带错误处理
// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.status = err.status || err.statusCode || 500;
//         ctx.body = {
//             message: err.message
//         }
//     }
// })
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(jsonError({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
// 支持文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, 'public/uploads'),
        // 保留文件扩展名
        keepExtensions: true,
    }
}));
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
    console.log('启动成功')
    console.log('http://localhost:3000')
});