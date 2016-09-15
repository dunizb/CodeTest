/**
 * Created by Administrator on 2016/9/15 0015.
 * 静态服务器实现路由转发
 */

var http = require('http');

http.createServer(function(request,response){
    var url = request.url;
    if(url == '/about.html'){
        response.write('about');
    }else if(url == '/zhaoping.html'){
        response.write('zhaoping');
    }else{
        response.write('你好');
    }
    response.end();
}).listen(3000,function(){
    console.log('now started....');
});