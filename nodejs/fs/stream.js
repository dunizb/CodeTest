/**
 * Created by Administrator on 2016/9/13 0013.
 * 文件流
 */
var fs = require('fs');
var path = require('path');

var srcPath = "E:\\Book\\深入理解bootstrap.pdf";
var desPath = "D:\\bootstrap.pdf";
var readStream = fs.createReadStream(srcPath);
var writeStream = fs.createWriteStream(desPath);

//管道方式，最推荐
readStream.pipe(writeStream);

//readStream.on('data',function(data){
//    writeStream.write(data);
//});
//
//readStream.on('end',function(){
//    console.log('文件拷贝完成....');
//});