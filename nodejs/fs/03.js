/**
 * Created by Administrator on 2016/9/12 0012.
 * 文件的打开与写
 */
var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');

fs.stat(str,function(error,stats){
    if(stats.isFile()){
        /**
         * 参数1：表示路径
         * 参数2：读写标志位
         * 参数3：读/写/可执行/ 4/2/1
         * 参数4：回调函数
         *  - 参数1：错误信息
         *  - 参数2：文件句柄，类似定时器的timerId
         */
        fs.open(str,'r',function(err,fd){
            console.log(fd);
            var buffer = new Buffer(5);
            // fd：文件句柄，
            // buffer：文件读取到什么地方
            // offset：从buffer的什么位置开始写
            // length：向buffer中写多少个字节
            // position：从文件中的什么位置开始读
            // callback：回调函数
            // fs.read(fd,buffer,offset,length,position,callback);
            fs.read(fd,buffer,0,3,0,function(err,n,newBuffer){
                console.log(n);
                console.log(newBuffer.toString());
                console.log(buffer.toString());
            });
        });
    }
});