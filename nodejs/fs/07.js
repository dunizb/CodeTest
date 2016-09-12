/**
 * Created by Administrator on 2016/9/12 0012.
 * 目录操作
 */
var fs = require('fs');
var path = require('path');

//当前目录下创建www文件夹
var str = path.join(__dirname,'www1');

//fs.mkdir(str,function(err){
//    console.log(err);
//});

//fs.mkdirSync(str);

//读目录
//fs.readdir(__dirname,function(er,files){
//    files.forEach(function(item){
//        fs.stat(path.join(__dirname,item),function(err,stats){
//            if(stats.isFile()){
//                console.log(item+"是文件");
//            }else if(stats.isDirectory()){
//                console.log(item+"是文件夹");
//            }
//        });
//    });
//
//});

//var files = fs.readdirSync(__dirname);
//files.forEach(function(item){
//    fs.stat(path.join(__dirname,item),function(err,stats){
//        if(stats.isFile()){
//            console.log(item+"是文件");
//        }else if(stats.isDirectory()){
//            console.log(item+"是文件夹");
//        }
//    });
//});

//删除目录
//fs.rmdir(path.join(__dirname,'www1'),function(err){
//    console.log(err);
//});

fs.rmdirSync(path.join(__dirname,'www'));