/************************
 * 全局变量方式创建单例模式
 ************************/
console.log('======【全局变量方式创建单例模式】======')
var instance = null;
function Tool() {
    // 1. 判断
    if (instance) {
        return instance;
    } 
    // 2. 指向
    instance = this;
    this.name = 'dunizb';
    this.intro = '七年就是一辈子';
}

// 3. 实例化
var t1 = new Tool();
var t2 = new Tool();
var t3 = new Tool();
console.log('t1 === t2', t1 === t2)
console.log('t2 === t2', t2 === t3)
console.log('t3 === t1', t3 === t1)


/************************
 * 即时函数方式创建单例模式
 ************************/
console.log('\n======【即时函数方式创建单例模式】======');
(function(w) {
	let instance = null;
    function Fool() {
        // 1. 判断
        if (instance) {
            return instance;
        } 
        // 2. 指向
        instance = this;
        this.name = 'dunizb';
        this.intro = '七年就是一辈子';
    }
    w.Fool = Fool;
})(window);

var f1 = new Fool();
var f2 = new Fool();
var f3 = new Fool();
console.log('f1 === f2', f1 === f2)
console.log('f2 === f2', f2 === f3)
console.log('f3 === f1', f3 === f1)


/************************
 * 闭包-惰性函数创建单例模式
 ************************/
console.log('\n======【闭包-惰性函数创建单例模式】======');

function Single() {
    var instance = this;
    this.name = 'dunizb';
    this.age = 18;

    // 惰性函数（函数只会被执行依次，后面直接调用）
    Single = function() {
        return instance;
    }
}


Single.prototype.run = function() {
    console.log('跑')
}
var s1 = new Single();
// Single.prototype.run = function() {
//     console.log('跑')
// }
var s2 = new Single();
console.log('s1 === s2', s1 === s2)
s1.run();
s2.run();