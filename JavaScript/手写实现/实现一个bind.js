Function.prototype.myBind = function (objThis, ...params) {
    // 存储源函数以及上方的params(函数参数)
    const thisFn = this; 
    // 对返回的函数 secondParams 二次传参
    let fToBind = function (...secondParams) {
        console.log('secondParams',secondParams,...secondParams)
        // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
        const isNew = this instanceof fToBind 
        // new调用就绑定到this上,否则就绑定到传入的objThis上
        const context = isNew ? this : Object(objThis) 
        // 用call调用源函数绑定this的指向并传递参数,返回执行结果
        return thisFn.call(context, ...params, ...secondParams); 
    };
    // 复制源函数的prototype给fToBind
    fToBind.prototype = Object.create(thisFn.prototype); 
    // 返回拷贝的函数
    return fToBind; 
};

const foo = { x: 1 }
var bar = function(){
    console.log(this.x);
}
bar(); // undefined
var func = bar.myBind(foo);
func(); // 1


const queuedObservers = new Set();
const observe = function(fn){
    queuedObservers.add(fn)
}
const observable = function(obj) {
    return new Proxy(obj, {
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            queuedObservers.forEach(observer => observer());
            return result;
        }
    })
}
