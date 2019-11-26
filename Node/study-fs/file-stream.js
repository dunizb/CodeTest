/**
 * 同步异步简单文件写入都不适合写入大文件，性能较差，容易内存溢出
 */

const fs = require('fs')

// 流式文件写入
// 创建一个可写流
// fs.createWriteStream(path[, options])
const stream = fs.createWriteStream('stream.txt')

// 可以通过监听流的open和close事件
stream.once('open', function() {
    console.log('文件流打开了')
})
stream.once('close', function() {
    console.log('文件流关闭了')
})

// 通过stream输出内容
stream.write('同步异步简单文件写入都不适合写入大文件，性能较差，容易内存溢出，')
stream.write('可以通过监听流的open和close事件，')
stream.write('流式文件写入。')

// 关闭流
stream.end()
// 关闭流官道！
// stream.close()
