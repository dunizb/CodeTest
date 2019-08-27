module.exports = function (options) {
    console.log('options', options)
    return async (ctx, next) => {
        console.log('ctx', ctx)
        await next()
    }
}