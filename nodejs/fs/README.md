# 文件操作（File System）

- 查看文件的基本信息 stat

```
var str = path.join(__dirname,'data.json');
fs.stat(str,function(error,stats){
    console.log(stats);
})
```

- 打开文件 open
- 读取文件 read


```
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
```

- 写入文件 write
- 关闭文件 close
- 监视文件变化 watchFile
```
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
```