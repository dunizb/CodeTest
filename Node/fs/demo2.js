const fs = require('fs')

// fs.stat('demo1.js', (error,stats)=>{
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(stats)
//         console.log(`文件：${stats.isFile()}`)
//         console.log(`目录：${stats.isDirectory()}`)
//     }
// })

// fs.mkdir('logs', error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('目录创建成功！')
//     }
// })

// fs.writeFile('logs/hello.log','您好~\n', error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('成功写入文件');
//     }
// })

// fs.appendFile('logs/hello.log','hello~\n', error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('成功写入文件');
//     }
// })

// fs.readFile('logs/hello.log','utf-8', (error, data) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(data);
//     }
// })

// fs.readdir('logs', (error, files) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(files);
//     }
// })

// fs.rename('js/hello.log', 'js/greeting.log', error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('重命名成功')
//     }
// })

// fs.rmdir('logs', error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('成功删除了目录 logs')
//     }
// })

fs.unlink(`logs/${file}`, error => {
    if(error) {
        console.log(error)
    } else {
        console.log(`成功删除了文件： ${file}`)
    }
})

const fileReadStream = fs.fileReadStream('demo1.js')
let count = 0
let str = ''
fileReadStream.on('data', chunk => {
    console.log(`${++count}接收到：${chunk.length}`)
    str += chunk
})
fileReadStream.on('end', () => {
    console.log('---结束---')
    console.log(count + '，' + star)
})
fileReadStream.on('error', error => {
    console.log(error)
})

// const fs = require("fs");
// const data ='我是从数据库获取的数据，我要保存起来'
// //创建一个可以写入的流，写入到文件output.txt中
// const writerStream = fs.createWriteStream('output.txt')
// //使用utf8编码写入数据
// writerStream.write(data,'UTF8')
// //标记文件末尾
// writerStream.end()
// //处理流事件-->finish事件
// writerStream.on('finish', () => {
//     /*finish-所有数据已被写入到底层系统时触发。*/
//     console.log("写入完成。")
// })
// writerStream.on('error', err => {
//     console.log(err.stack);
// })
// console.log("程序执行完毕")


//创建一个可读流
const readerStream = fs.createReadStream('input.txt')
//创建一个可写流
const writerStream = fs.createWriteStream('output.txt')
//管道读写操作
//读取input.txt文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream)
console.log("程序执行完毕")
