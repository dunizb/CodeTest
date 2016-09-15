var path = require('path');
var fs = require('fs');
var http = require('http');

var template = require('art-template');


http.createServer(function(req,res){
    if(req.url == '/index.html'){
        // 模板引擎
        var data = {
            list : [{
                username : 'zhangsan',
                chinese : '120',
                math : '149',
                english : '130',
                summary : '280'
            },{
                username : 'lisi',
                chinese : '60',
                math : '30',
                english : '70',
                summary : '180'
            }]
        };
        var html = template(path.join(__dirname,'/index'), data);
        res.write(html);
        res.end();
    }
}).listen(3000,function(){
    console.log('string success....');
});




