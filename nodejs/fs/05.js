/**
 * Created by Administrator on 2016/9/12 0012.
 * readFile读取文件
 */
var fs = require('fs');
var path = require('path');

var str = path.join(__dirname,'data.json');

//如果参数传递了编码，那么读取到的数据就是文本，否则就是Buffer
fs.readFile(str,"utf8",function(err,data){
    console.log(data);// <Buffer 61 61 61 61 61 20 6b 69 74 74 79 20 31 32 31 33 34>
    //console.log(data.toString()); // aaaaa kitty 12134

});

//异步方式读取
var con = fs.readFileSync(str,"utf8");
console.log(con);