function Tab(id) {
    this.tab = document.getElementById(id);
    this.aInput = this.tab.getElementsByTagName('input');
    this.aDiv = this.tab.getElementsByTagName('div');
    this.nowIndex = 0;
}

Tab.prototype.init = function() {
    this.aInput[0].style.backgroundColor = 'orange';
    this.aDiv[0].style.display = 'block';
    var that = this;
    for (var i = 0; i < this.aInput.length; i++) {
        this.aInput[i].index = i;
        this.aInput[i].onclick = function() {
            // 切换功能
            // 这里的this是当前点击的input
            that.change(this);
        }
    }
    // this.autoPlay();
}

Tab.prototype.change = function(obj) {
    // 这里的this是实例对象
    for (var i = 0; i < this.aInput.length; i++) {
        this.aInput[i].style.backgroundColor = '';
        this.aDiv[i].style.display = 'none';
    }
    obj.style.backgroundColor = 'orange';
    this.aDiv[obj.index].style.display = 'block';
}

Tab.prototype.autoPlay = function(){
    // 这里的this是实例对象
    var that = this;
    setInterval(function(){
        // 自动切换功能
        // 这里的this是window
        // nowIndex 变化范围：0 1 2
        if(that.nowIndex === that.aInput.length - 1){
            // 如果当前循环的切换到最后一个，那么就从头开始
            that.nowIndex = 0;
        }else{
            that.nowIndex++;
        }
        var nowInput = that.aInput[that.nowIndex];
        that.change(nowInput);
    },1000);
}