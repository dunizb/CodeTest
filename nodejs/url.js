// =================== URI与URL的区别？ ========================
// URI属于URL更高层次的抽象，一种字符串文本标准。就是说，URI属于父类，而URL属于URI的子类。URL是URI的一个子集。
// 二者的区别在于，URI表示请求服务器的路径，定义这么一个资源。而URL同时说明要如何访问这个资源（http://）。
// URI可以表示一个域，也可以表示一个资源。URL只能表示一个资源。

var url = require('url');

// 解析URL字符串为对象
var res = url.parse("http://www.imooc.com/search/course?words=node");
// console.log(res);
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.imooc.com',
//   port: null,
//   hostname: 'www.imooc.com',
//   hash: null,
//   search: '?words=node',
//   query: 'words=node',
//   pathname: '/search/course',
//   path: '/search/course?words=node',
//   href: 'http://www.imooc.com/search/course?words=node' }

var res = url.parse("http://www.imooc.com/search/course?words=node",true);
// console.log(res);
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.imooc.com',
//   port: null,
//   hostname: 'www.imooc.com',
//   hash: null,
//   search: '?words=node',
//   query: { words: 'node' },
//   pathname: '/search/course',
//   path: '/search/course?words=node',
//   href: 'http://www.imooc.com/search/course?words=node' }

var urlobj =  {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.imooc.com',
  port: null,
  hostname: 'www.imooc.com',
  hash: null,
  search: '?words=node',
  query: { words: 'node' },
  pathname: '/search/course',
  path: '/search/course?words=node',
  href: 'http://www.imooc.com/search/course?words=node' }

// 格式化字符串对象为URL 
var res = url.format(urlobj);  
// console.log(res);  
// http://www.imooc.com/search/course?words=node

var res = url.resolve("http://www.imooc.com/","search/course?words=node");
// console.log(res); 
// http://www.imooc.com/search/course?words=node

