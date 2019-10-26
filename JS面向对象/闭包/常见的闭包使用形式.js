/** 1. 将函数作为另外一个函数的返回值 */
console.log('1. 将函数作为另外一个函数的返回值')
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
console.log('2. 将函数的形参作为实参传递给另一个函数调用')
function logMsgDelay(msg, timeout) {
    setTimeout(() => {
        console.log('msg = ', msg);
    }, timeout);
}
logMsgDelay('哈哈哈', 1200);