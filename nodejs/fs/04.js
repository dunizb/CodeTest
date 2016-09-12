/**
 * Created by Administrator on 2016/9/12 0012.
 * 写文件与关闭
 */
var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');

//先判断文件是否存在
fs.exists(str,function(flag){
    if(flag){
        fs.open(str,'r+',function(err,fd){
            var bf = new Buffer('aaaaa');
            //异步方式
            //fs.write(fd,bf,0,5,0,function(err,writen,buffer){
            //    console.log(writen);
            //    console.log(buffer);
            //});
            //同步方式
            var ret = fs.writeSync(fd,bf,0,5,0);
            console.log(ret);//返回写入的字节数

            //异步关闭
            //fs.close(fd,function(err){
            //    console.log(err);
            //});
            //同步关闭
            fs.closeSync(fd);
        });

    }
});