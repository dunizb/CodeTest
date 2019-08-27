const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
    try {
        console.log('ctx', ctx)
        await next()
    } catch (error) {
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                code: error.code,
                request: `${ctx.method} ${ctx.path}`,
            },
            ctx.status = error.status
        }
    }
}

module.exports = catchError