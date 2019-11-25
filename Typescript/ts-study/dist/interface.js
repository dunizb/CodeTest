"use strict";
var myhusband = { sex: '男', interest: '看书、作家务' };
console.log(myhusband);
function createSquare(config) {
    var newSquare = { color: 'red', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * 2;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'red' });
console.log('mySquare', mySquare);
// 你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了。
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
