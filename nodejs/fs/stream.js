/**
 * Created by Administrator on 2016/9/13 0013.
 * 文件流，拷贝一个文件
 */
var fs = require('fs');
var path = require('path');

var srcPath = "E:\\Book\\深入理解bootstrap.pdf";
var desPath = "D:\\bootstrap.pdf";
fs.readFile(srcPath,function(err,data){
    fs.writeFile(desPath,data,function(err){
        console.log("文件拷贝完成。。。");
    });
});
