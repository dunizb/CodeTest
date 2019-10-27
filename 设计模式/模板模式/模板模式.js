/**
 * 冲果汁。无论冲什么果汁，都需要经过烧开水，放入材料、搅拌、冷却操作，不同的只是放什么材料（水果），放什么水果初什么果汁。
 */
/** ******************** 模板 ************************** */
function Fruit() {}
Fruit.prototype.make = function() {
    // 1. 烧开水
    this.water();
    // 2. 放入材料
    this.cailiao();
    // 3. 搅拌
    this.jiaoban();
    // 4. 冷却
    this.lengque();
}
// 开水
Fruit.prototype.water = function() {
    console.log('烧好开水，倒开水~~');
}
// 材料
Fruit.prototype.cailiao = function() {
    // throw new Error('必须由子类来重写该方法！');
}
// 搅拌
Fruit.prototype.jiaoban = function() {
    console.log('充分搅拌！');
}
// 冷却
Fruit.prototype.lengque = function() {
    console.log('太烫了，冷一冷就可以喝了！\n');
}

/** ******************** 使用，放入不同的材料 ************************** */
// 子类，苹果
function Apple() {}
Apple.prototype = new Fruit();
Apple.prototype.cailiao = function() {
    console.log('放入苹果~~')
}
var apple = new Apple();
apple.make();

// 子类，梨子
function Pear() {}
Pear.prototype = new Fruit();
Pear.prototype.cailiao = function() {
    console.log('放入梨子~~')
}
var pear = new Pear();
pear.make();