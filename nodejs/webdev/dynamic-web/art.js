/**
 * Created by Administrator on 2016/9/15 0015.
 */

var template = require('art-template');
var data = { list:["zhangbing","dunizb"] };

var html = template(__dirname + '/art',data);
console.log(html);