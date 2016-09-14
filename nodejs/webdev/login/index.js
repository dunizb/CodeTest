var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var db = require('./database.js');

http.createServer(function(req,res){
    var obj = url.parse(req.url,true);
    if(obj.pathname.startsWith('/www/')){
        // 这里实现静态服务器功能
        fs.readFile(path.join(__dirname,obj.pathname),'utf8',function(err,data){
            res.end(data);
        });
    }else if(obj.pathname == '/login'){
        // 这里实现登录验证功能
        var uname = obj.query.username;
        var pw = obj.query.password;
        // 正常情况下应该访问数据库
        db.checkUser(uname,pw,function(data){
            res.end(data);
        });
        // 假数据验证方式
        // var ret = {flag:2};
        // if(uname == 'admin' && pw == '123'){
        //     ret.flag = 1;
        // }
        // res.end(JSON.stringify(ret));
    }
}).listen(3000,function(){
    console.log('running.....');
});