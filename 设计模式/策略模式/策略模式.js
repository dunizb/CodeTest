// 一个策略李有三种方案（策略）
let Strategy = {
    slow(distance) {
        console.log('慢速运动策略，耗时：', distance * 2, '小时')
    },
    normal(distance) {
        console.log('普通运动策略，耗时：', distance , '小时')
    },
    fast(distance) {
        console.log('快速运动策略，耗时：', distance / 2, '小时')
    }
}

function PersonRun(from, to) {
    this.from = from;
    this.to = to;
}
PersonRun.prototype.run = function(strategy) {
    strategy(this.to - this.from);
}

let p = new PersonRun(0, 20);
p.run(Strategy.slow);
p.run(Strategy.normal);
p.run(Strategy.fast);