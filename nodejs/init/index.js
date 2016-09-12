/**
 * Created by Administrator on 2016/9/12 0012.
 */
var obj = require('./init.js');
var param = process.argv[2];

switch (param){
    case 'init':
        //实现初始化操作
        obj.init();
        break;
    case '-v':
        console.log('版本信息');
        break;
    case '-h':
        console.log('帮助信息');
        break;
}