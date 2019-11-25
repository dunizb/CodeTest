const fs = require('fs')

// 1. 打开文件
fs.open('hello.txt', 'w', function(err, fd) {
    console.log(fd)
    if (err) throw err;
    // 2. 向文件写入内容
    fs.write(fd, 'hello node.js FileSystem', function() {
        // 3. 关闭文件
        fs.close(fd, (err) => {
            if (err) throw err;
        });
    })
})

