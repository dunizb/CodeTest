/** 1. 将函数作为另外一个函数的返回值 */
console.log('======1. 将函数作为另外一个函数的返回值======')
function fn1() {
    var num = 10;
    return function fn2() {
        num++;
        console.log('num = ', num);
    }
    // return fn2;
}
var f = fn1();
f();
f();

/** 2. 将函数的形参作为实参传递给另一个函数调用 */
console.log('======2. 将函数的形参作为实参传递给另一个函数调用======')
function logMsgDelay(msg, timeout) {
    setTimeout(() => {
        console.log('2. msg = ', msg);
    }, timeout);
}
logMsgDelay('哈哈哈', 1200);

console.log('======3. 模块封装（自定义JS模块）======')
// 将所有的数据和功能都封装在一个函数内部（私有的）
// 只向外暴露一个包含多个方法的对象或函数
// 模块的使用者只需要使用模块暴露的对象或函数调用方法来实现对应的功能。
function myTool() {
    // 1. 私有的数据
    var money = 1000;
    // 2. 提供操作私有数据的函数
    function get() {
        money *= 10;
        console.log('赚了一笔钱，总资产：' + money + '元');
    }
    function send() {
        money--;
        console.log('花了一笔钱，总资产：' + money + '元');
    }
    return {
        get,
        send
    }
}

var tool = myTool();
tool.get();
tool.send();