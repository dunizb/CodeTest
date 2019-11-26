/**
 * 同步、异步文件读取同写入逻辑
 * 简单文件读取：fs.readFileSync(path[, options])
 * http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback
 */

const fs = require('fs')

// 同步读取
const file = fs.readFileSync('buffer.txt')
console.log(file.toString())

// 异步读取
fs.readFile('avatar.png', function(err, data) {
    if(!err) {
        console.log(data)
    }
})

// 读取再写入图片
fs.readFile('avatar.png', function(err, data) {
    if(!err) {
       fs.writeFile('copy.png', data, function(err){
           console.log(err)
            if(!err) {
                console.log('图片复制成功！')
            }
       })
    }
})