/**
 * Created by Administrator on 2016/9/15 0015.
 * 静态服务器实现路由转发
 */

var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function(request,response){
    var url = request.url;

    var reqPath = path.join(__dirname,url);
    fs.readFile(reqPath,"utf8",function(err,data){
        if(err) {
            var str = fs.readFileSync(path.join(__dirname,"./404.html"),"utf8");
            response.write(str);
            response.end();
        }else{
            response.write(data);
            response.end();
        }

    });

}).listen(3000,function(){
    console.log('now started....');
});