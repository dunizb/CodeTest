/**
 * 【代码功能】
 * 判断服务器上面有没有 upload 目录。如果没有就创建这个目录，如果有的话不做操作
 */

const fs = require('fs')

const path = './upload'
fs.stat(path, (err, data) => {
    if(err) {
        // 执行创建目录
        mkdir(path)
        return
    }
    if(data.isDirectory()) {
        console.log('upload目录存在');
    }else{
        // 首先删除文件，再去执行创建目录
        fs.unlink(path, err => {
            if(!err) {
                mkdir(path)
            }
        })
    }
})

function mkdir(dir) {
    fs.mkdir(dir, err => {
        if(err) {
            console.log(err);
            return
        }
    })
}
