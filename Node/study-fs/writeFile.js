/**
 * 简单文件写入
 * fs.writeFile(file, data[, options], callback)
 * fs.writeFileSync(file, data[, options]) http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback
 * - file 要操作的文件路径
 * - data 要写入的数据
 * - options [可选]选项，可以对写入进行一些设置
 *  - encoding <string> | <null> 默认值: 'utf8'。
 *  - mode <integer> 默认值: 0o666。
 *  - flag <string> 参阅支持的文件系统标志。默认值: 'w'。http://nodejs.cn/api/fs.html#fs_file_system_flags
 */

const fs = require('fs')
const options = {
    // flag: 'w' // 覆盖写入
    flag: 'a'    // 追加写入
}
fs.writeFile('hello2.txt', '，追加写入', options, function(err) {
    if(!err) {
        console.log('writeFile success')
    }
})

fs.writeFile('/Users/zhangbing/Desktop/hello2.txt', '，追加写入', options, function(err) {
    if(!err) {
        console.log('桌面文件写入成功！')
    }
})