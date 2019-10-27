/************************
 * 简单的观察者模式，发布固定的消息
 * 给学生发布一些消息
 ************************/

// 1. 消息的发布者
// 2. 可以让别人订阅你的消息
// 3. 可以发布消息

const lk = {
    // 1.1 用户群体
    targetAction: [],
    // 1.2 添加用户
    addUser(target, action) {
        var obj = { target, action };
        this.targetAction.push(obj);
    },
    publishMsg() {
        for(let i = 0, len = this.targetAction.length; i < len; i++) {
            let { target, action } = this.targetAction[i];
            action.call(target, '明天周六补课！！');
        }
    }
}

function response(msg) {
    console.log('消息已推送给【', this.name, '】，消息为：', msg);
}

let stu1 = { name: '张三' }
let stu2 = { name: '李思' }
lk.addUser(stu1, response);
lk.addUser(stu2, response);

// 开始广播
lk.publishMsg();