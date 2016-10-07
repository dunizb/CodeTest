// =================== 序列化 =====================

var qs = require('querystring');

var res = qs.stringify({name:'dunizb',course:['jade','node'],from:''});
// console.log(res);
// name=dunizb&course=jade&course=node&from=

//第二个参数指定分隔符
var res = qs.stringify({name:'dunizb',course:['jade','node'],from:''},'-');
// console.log(res);
// name=dunizb-course=jade-course=node-from=

//第三个参数指定key,value之间的符号
var res = qs.stringify({name:'dunizb',course:['jade','node'],from:''},'-',':');
// console.log(res);
// name:dunizb-course:jade-course:node-from:


// ================== 反序列化 =======================

var res = qs.parse('name=dunizb&course=jade&course=node&from=');
// console.log(res);
// { name: 'dunizb', course: [ 'jade', 'node' ], from: '' }

var res = qs.parse('name=dunizb-course=jade-course=node-from=','-');
// console.log(res);
// { name: 'dunizb', course: [ 'jade', 'node' ], from: '' }

var res = qs.parse('name:dunizb-course:jade-course:node-from:','-',':');
// console.log(res);
// { name: 'dunizb', course: [ 'jade', 'node' ], from: '' }

// ================== 转义与反转义 =======================
var res = qs.escape('<哈哈>');
// console.log(res);
// %3C%E5%93%88%E5%93%88%3E

var res = qs.unescape('%3C%E5%93%88%E5%93%88%3E');
// console.log(res);
// <哈哈>

