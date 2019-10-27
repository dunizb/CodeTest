// 点餐人员，关注点：菜单
// 厨房老大，关注点：分配菜单
// 厨师，关注点：菜单
// 业务分离，低耦合

// 厨师1
var cook1 = {
    name: '王小二',
    make(foodType) { // foodType 做菜的类型
        switch(foodType) {
            case 'tudou': 
                console.log(this.name, '做土豆')
                break;
            case 'jidang': 
                console.log(this.name, '做鸡蛋')
                break;    
            case 'fanqie': 
                console.log(this.name, '做番茄')
                break;    
            default:
                console.log('不会做！！')
                break;
        }
    }
}
// 厨师2
var cook2 = {
    name: '王大二',
    make(foodType) { // foodType 做菜的类型
        switch(foodType) {
            case 'tudou': 
                console.log(this.name, '做土豆加酸醋')
                break;
            case 'jidang': 
                console.log(this.name, '做鸡蛋加辣椒')
                break;    
            case 'fanqie': 
                console.log(this.name, '做番茄加酱油')
                break;    
            default:
                console.log('不会做！！')
                break;
        }
    }
}

// 服务员，帮助客人点餐
var foodList = ['tudou', 'jidang', 'fanqie']
// 点餐系统，分配菜单
function MakeFoodCommand(cook, foodType) {
    this.cook = cook;
    this.foodType = foodType;
}
MakeFoodCommand.prototype.execute = function() {
    this.cook.make(this.foodType);
}

// 做菜命令
var commands = [];
for(var i = 0; i < foodList.length; i++) {
    var command = null;
    // 随机分配
    if (Math.ceil(Math.random() * 10) > 4) {
        command = new MakeFoodCommand(cook1, foodList[i])
    } else {
        command = new MakeFoodCommand(cook2, foodList[i])
    }
    commands.push(command);
}

// console.log(commands)

commands.forEach(cmd => {
    // console.log(cmd);
    cmd.execute();
})
