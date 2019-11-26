/**
 * 流式文件读取，适用于大文件
 */

const fs = require('fs')

const fromPath = '/Users/zhangbing/Downloads/Vue-3-Cheat-Sheet-zh.pdf'
// 创建一个可读流
const readStream = fs.createReadStream(fromPath)
// 创建一个可写流
const writeStream = fs.createWriteStream('Vue-3-Cheat-Sheet-zh.pdf')

readStream.once('open', function() {
    console.log('可读流打开~~~')
})
readStream.once('close', function() {
    console.log('可读流关闭~~~')
    // 数据读取完毕，关闭可写流
    writeStream.end()
})
writeStream.once('open', function() {
    console.log('可写流打开~~~')
})
writeStream.once('close', function() {
    console.log('可写流关闭~~~')
})

// pipe 将可读流中的内容写入到可写流中
readStream.pipe(writeStream)