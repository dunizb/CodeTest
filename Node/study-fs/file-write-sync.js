const fs = require('fs')

/**
 * 手动操作的步骤
 * 1. 打开文件
 *      fs.openSync(path, flags[, mode])：
 *      - path 要打开的文件路径
 *      - flags（r：只读；w：只写）
 *      - mode 设置文件的操作权限（一般不写）
 *      返回值：
 *      - 返回一个文件描述符，我们可以通过该描述符来对文件进行操作
 * 2. 向文件中写入内容
 *      fs.writeSync(fd, string[, position[, encoding]])
 *      - fd 文件描述符，需要传递要写入的文件描述符
 *      - string 要写入的内容
 *      - position 写入的起始为知
 *      - encoding 写入的编码，默认UTF-8
 * 3. 保存并关闭文件
 *      fs.closeSync(fd)
 */
// 打开文件
var fd = fs.openSync('hello.txt', 'w')
console.log(fd)
// 向文件写入内容
fs.writeSync(fd, 'hello node.js FileSystem')
// 关闭文件
fs.closeSync(fd)