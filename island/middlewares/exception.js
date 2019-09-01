const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isHttpExecption = error instanceof HttpException
        const isDev = global.config.env === 'dev'
        if (isDev && !isHttpExecption) {
            throw error
        }
        if (isHttpExecption) {
            ctx.body = {
                msg: error.msg,
                code: error.code,
                request: `${ctx.method} ${ctx.path}`,
            },
            ctx.status = error.status
        } else {
            ctx.body = {
                msg: '出现了未知异常~~~！',
                code: 999,
                request: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError