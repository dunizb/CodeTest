var Time = {
    // 获取当前时间戳
    getUnix() {
        var date = new Date();
        return date.getTime();
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒
    getYearUnix() {
        var date = new Date();
        date.setMonth(0);
        date.setDate(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate(time) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime(timestamp) {
        var now = this.getUnix(); // 当前时间戳
        var today = this.getTodayUnix(); // 今天0点时间戳
        var year = this.getYearUnix(); // 今年0点时间戳
        var timer = (now - timestamp) / 1000; // 转换为秒级时间
        var tip = '';

        if(timer <= 0) { // 1分钟以前
            tip = '刚刚';
        } else if (Math.floor(timer/60) <= 0) { // 1分钟以前
            tip = '刚刚';
        } else if(timer < 3600) { // 1分钟~1小时之间
            tip = Math.floor(timer/60) + '分钟前';
        } else if(timer >= 3600 && (timestamp - today >= 0)) { // 1小时~1天之间
            tip = Math.floor(timer/3600) + '小时前';
        } else if(timer/86400 <= 31) { // 1天~1个月之间
            tip = Math.ceil(timer/86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
}

Vue.directive('time', {
    bind(el, binging) {
        el.innerHTML = Time.getFormatTime(binging.value);
        el.__timeout__ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binging.value);
        }, 60000);
    },
    unbind(el) {
        clearInterval(el.__timeout__ );
        delete el.el.__timeout__ ;
    }
});