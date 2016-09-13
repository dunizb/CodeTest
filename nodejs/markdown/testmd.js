/**
 * Created by Administrator on 2016/9/13 0013.
 */

var md = require('markdown-it')();
var str = md.render("# 1 Level");
console.log(str);   // <h1>1 Level</h1>



