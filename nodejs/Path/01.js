/**
 * Created by Administrator on 2016/9/10 0010.
 */

var path = require('path');

var str = path.normalize('/root/bar//baz/www/abc/..');
console.log(str);//\root\bar\baz\www

var str1 = path.basename('/foo/bar/baz/asdf/quux.html');//文件名
console.log(str1);// quux.html

var str2 = path.dirname('/foo/bar/baz/asdf/quux.html');//文件路径，但是不包括文件名称
console.log(str2);// /foo/bar/baz/asdf

var str3 = path.extname('/foo/bar/baz/asdf/quux.html');//文件扩展名
console.log(str3);// .html

var obj = path.parse('/home/user/dir/file.txt');
console.log(obj);
//{ root: '/',
//    dir: '/home/user/dir',
//    base: 'file.txt',
//    ext: '.txt',
//    name: 'file' }



