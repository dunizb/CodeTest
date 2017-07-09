function Ele(id){
    this.ele = document.getElementById(id);
}

Ele.prototype.html = function(val){
    var ele = this.ele;
    if(val){
        ele.innerHTML = val;
        return this;    //链式操作
    }else{
        return ele.innerHTML;
    }
}

Ele.prototype.on = function(type, fn){
    var ele = this.ele;
    ele.addEventListener(type, fn);
}

var div1 = new Ele('footer');

div1.html('<p>哈哈哈</p>').on('click', function(){
    alert("啊哈哈");
});