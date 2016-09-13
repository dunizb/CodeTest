/**
 * Created by Administrator on 2016/9/12 0012.
 * 初始化目录
 */
var config = require('./config.js');
var path = require('path');
var fs = require('fs');

var root = config.rootName;

exports.init = function(){
    fs.mkdir(path.join(__dirname,root),function(){
        //创建子目录
        config.files.forEach(function(item){
            if(item.type == 'dir'){
                fs.mkdirSync(path.join(__dirname,root,item.fileName));
            }else if(item.type == 'file'){
                fs.writeFile(path.join(__dirname,root,item.fileName),item.content,'utf8');
            }
        });
    });
}
