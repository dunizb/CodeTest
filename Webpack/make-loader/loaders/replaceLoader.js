const loaderUtils = require('loader-utils')

module.exports = function(source) {
    // console.log(this.query)
    const options = loaderUtils.getOptions(this)
    const result =  source.replace('hello', options.name)
    this.callback(null, result)
}

// 一个可以同步或者异步调用的可以返回多个结果的函数。预期的参数是：
// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: SourceMap,
//     meta?: any
// );