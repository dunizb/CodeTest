/**
 * Created by Administrator on 2016/9/13 0013.
 * 检测文件
 */
var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');

var watchFn = function(curr,prev){
    console.log(`the current mtime is ${curr.mtime}`);
    console.log(`the previous mtime is ${prev.mtime}`);
}

fs.watchFile(str,{
    persistem:true,//表示一直检测文件
    intval:50   //每隔多久检测一下文件是否发生了变化
},watchFn); //watchFn:监听函数

//setTimeout(function(){
//    console.log(123);
//    fs.unwatchFile(str);
//},3000);