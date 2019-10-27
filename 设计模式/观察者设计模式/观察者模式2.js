/************************
 * 简单的观察者模式，发布固定的消息
 * 给学生发布一些消息
 ************************/
// 1. 消息的发布者
// 2. 可以让别人订阅你的消息
// 3. 可以发布消息

const lk = {
    typeTargetAction: [],
    /**
     * 1.1 添加用户
     * @param {*} type 消息类型
     * @param {*} target 目标用户
     * @param {*} action 动作
     */
    addUser(type, target, action) {
        // 1.2 判断有没有该类型
        if (typeof this.typeTargetAction[type] === 'undefined') {
            this.typeTargetAction[type] = []
        }

        // 1.3 创建对象
        const obj = { target, action };
        this.typeTargetAction[type].push(obj);
    },
    // 2. 发布消息
    publishMsg(type, msg) {
        // 2.1 获取学科
        let targetActions = this.typeTargetAction[type] || []
        for(let i = 0, len = targetActions.length; i < len; i++) {
            let { target, action } = targetActions[i];
            action.call(target, msg);
        }
    }
}

let stu1 = { name: '张三' }
let stu2 = { name: '李思' }
lk.addUser('H5', stu1, function(msg) {
    console.log(msg, '已经推送给：', this.name);
});
lk.addUser('H5', stu2, function(msg) {
    console.log(msg, '已经推送给：', this.name);
});
lk.addUser('Javascript', stu1, function(msg) {
    console.log(msg, '已经推送给：', this.name);
});
lk.addUser('Python', stu2, function(msg) {
    console.log(msg, '已经推送给：', this.name);
});

// 开始广播
lk.publishMsg('H5', '偷偷告诉你，H5其实就是HTML5的简写');
lk.publishMsg('Javascript', 'Javascript牛逼啊，最新的ES8来了！');
lk.publishMsg('Python', 'Python是人工智能时代首选编程语言');