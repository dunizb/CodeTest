/**
 * Created by Administrator on 2016/9/12 0012.
 */
var path = require('path');
var fs = require('fs');

var initData = {
    rootName: 'root',
    files:[{
        fileName:'css',
        type:'dir'
    },{
        fileName:'img',
        type:'dir'
    },{
        fileName:'js',
        type:'dir'
    },{
        fileName:'index.html',
        type:'file',
        content:fs.readFileSync(path.join(__dirname,'./index.html'),'utf8')
    },{
        fileName:'404.html',
        type:'file',
        content:fs.readFileSync(path.join(__dirname,'./404.html'),'utf8')
    }]
};

module.exports = initData;