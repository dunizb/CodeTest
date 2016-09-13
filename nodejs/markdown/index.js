/**
 * Created by Administrator on 2016/9/13 0013.
 */

var path = require('path');
var fs = require('fs');
var md = require('markdown-it')();

var mdPath = path.join(__dirname,'./README.md');
var tempPath = path.join(__dirname,'./template.html');
var desPath = path.join(__dirname,'./README.html');

fs.watchFile(mdPath,{interval:50},function(curr,prev){
    // curr表示变化后的文件信息，preview：表示变化前的信息
    fs.readFile(mdPath,'utf8',function(err,data){
        var html = md.render(data);
        var template = fs.readFileSync(tempPath,'utf8');
        var newHtml = template.replace('<%content%>',html);
        fs.writeFile(desPath,newHtml,"utf8",function(err){
            console.log('文件已经更新。。。。');
        });
    });
})
