/************************
 * 简单工厂设计模式
 ************************/
console.log('==========【简单工厂设计模式】============')
// 咖啡机，生产咖啡
// 材料： 咖啡豆dou, 水water
function makeCoffee(dou, water) {
    var obj = new Object();
    obj.dou = dou;
    obj.water = water;
    obj.bili = dou / water;
    return obj;
}

var coffee1 = makeCoffee(1, 10);
console.log('造出来纯度为', coffee1.bili, '的咖啡')

var coffee2 = makeCoffee(3, 8);
console.log('造出来纯度为', coffee2.bili, '的咖啡')


/************************
 * 复杂工厂设计模式
 ************************/
console.log('\n==========【复杂工厂设计模式】============')

// 招商部门
// 生产果汁，传入苹果生产苹果汁，传入香蕉生产香蕉汁
// 果汁工厂
function FruitMaker() {}
FruitMaker.prototype.make = function(type, meta) {
    // 1. 判断工厂是否具备生产的能力
    // 如果是函数说明有该类型生产线
    console.log(this)
    if (typeof this[type] === 'function') {
        var func = this[type];
        console.log(func.name + ' 生产线~~~')
        // 2. 修正原型，无论生产什么都代表从这个工厂生产的
        func.prototype = FruitMaker.prototype;
        return new func(meta);
    } else {
        throw '很抱歉，工厂不能生产这个产品';
    }
}

// 扩展生产线的机器
FruitMaker.prototype.extend = function(obj) {
    for(var key in obj) {
        this[key] = obj[key]
    }
}

// 1. 实例化 苹果
var maker = new FruitMaker();
// 2. 创建果汁生产线
maker.extend({
    'Apple': function(meta) {
        console.log('造了一杯苹果汁，材料有：', meta.toString());
    },
    'Pear': function(meta) {
        console.log('造了一杯梨子汁，材料有：', meta.toString());
    },
})

var appleObj = maker.make('Apple', ['一个苹果','一斤水']);
console.log('生产的工厂： ', appleObj.constructor.name, '\n')
// 梨子
var pearObj = maker.make('Pear', ['两个梨子','一吨水']);
console.log('生产的工厂：', pearObj.constructor.name, '\n')
// 没有创建香蕉生产线，报错
var bananaObj = maker.make('Banana', ['五个香蕉','一桶水']);
console.log('生产的工厂：', bananaObj.constructor.name, '\n')
