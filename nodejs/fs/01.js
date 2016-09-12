/**
 * Created by Administrator on 2016/9/10 0010.
 * 查看文件基本信息
 */

var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');
console.log(str);// E:\CodeTest\nodejs\fs\data.json


// 查看文件基本信息
fs.stat(str,function(error,stats){
    console.log(stats);
    //{ dev: -1975121017,
    //    mode: 33206,
    //    nlink: 1,
    //    uid: 0,
    //    gid: 0,
    //    rdev: 0,
    //    blksize: undefined,
    //    ino: 9851624184918456,
    //    size: 10,
    //    blocks: undefined,
    //    atime: 2016-09-10T08:13:38.482Z,
    //    mtime: 2016-09-10T07:48:19.161Z,
    //    ctime: 2016-09-10T08:13:38.482Z,
    //    birthtime: 2016-09-10T08:13:38.482Z }
    if(stats.isFile()){
        console.log('这是文件');
    }else if(stats.isDirectory()){
        console.log('这是文件夹');
    }

    console.log(stats.isFile());
    console.log(stats.isDirectory());


});


