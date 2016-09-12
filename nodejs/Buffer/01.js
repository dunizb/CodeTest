/**
 * Created by Administrator on 2016/9/12 0012.
 * Buffer用来处理字节
 * Buffer用来处理字节，与数组类似

     API使用形式：
     1、构造函数
     2、静态方法
     3、实例方法
 */
var bf = new Buffer(5);
console.log(bf);//<Buffer 18 d7 d7 99 be>

var bf = new Buffer([27,2,3]);
console.log(bf);//<Buffer 1b 02 03>

var bf = new Buffer('中国','utf-8');
var bf = new Buffer('abc','utf-8');
console.log(bf.toString());
console.log(bf.length);

var bf1 = new Buffer('hello');
var  bf = new Buffer(bf1);
console.log(bf.toString());//hello

var  bf = new Buffer(3);
var arr = new Array();
console.log(Buffer.isBuffer(bf));//true
console.log(Buffer.isBuffer(arr));//false

var bf = new Buffer(5);
bf.write('abc',2,2,'utf-8');
console.log(bf);//<Buffer 00 00 61 62 00>



