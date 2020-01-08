const loaderUtils = require('loader-utils')

module.exports = function(source) {
    // console.log(this.query) 拿到配置参数
    const options = loaderUtils.getOptions(this)
    if(options) {
        // origin 要被替换的旧内容；replace 新内容
        source =  source.replace(options.origin, options.replace)
    }
    this.callback(null, source)
}

// 一个可以同步或者异步调用的可以返回多个结果的函数。预期的参数是：
// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: SourceMap,
//     meta?: any
// );