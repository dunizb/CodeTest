/**
 * Created by Administrator on 2016/9/11 0011.
 */

var http = require('http');

//创建服务
var server = http.createServer();

//注册服务
server.on('request',function(request,response){
    console.log(123);
    response.write('hellow write');
    response.end();
});

//监听端口
server.listen(3000);