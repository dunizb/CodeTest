/**
 * Created by Administrator on 2016/9/12 0012.
 * writeFile写文件
 */
var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');

var bf = new Buffer('hello nodeJs !!!');
fs.writeFile(str,bf,function(err){
    console.log(err);
});


// fs.writeFileSync(str,bf);
