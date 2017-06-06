//避免全局污染
var UserRuleSelect = (function(){
    var UserRuleSelect = function(options) {
        this.init(options || {});//渲染DOM结构
        this.bind();//绑定插件中DOM所需要的所有事件
    };

    var html = '<div class="user-rule-select">'
                +'<ul class="left-list data-list"></ul>'
            +'<div class="data-oper">'
                +'<a href="#" class="add button">添加</a>'
                +'<a href="#" class="del button">删除</a>'
            +'</div>'
            +'<ul class="right-list data-list"></ul>'
            +'<div class="data-bar"><a href="#" class="close button">取消</a><a href="#" class="enter button">确定</a></div>'
            +'</div>';

    UserRuleSelect.prototype = {
        init: function(options) {
            this.options = options; //初始化参数
            this.dom = document.createElement('div');
            this.dom.className = 'mask';
            this.dom.style.display = this.options.defaultShow ? 'flex' : 'none';//由用户决定是否初始化显示
            this.dom.innerHTML = html;

            this.status = this.options.defaultShow ? 0 : 1;//0隐藏、1显示
            document.body.appendChild(this.dom);

            this.left = this.dom.querySelector('.left-list.data-list');
            this.right = this.dom.querySelector('.right-list.data-list');

            this.add = this.dom.querySelector('.add.button');//寻找添加按钮
            this.del = this.dom.querySelector('.del.button');//寻找删除按钮

            this.enter = this.dom.querySelector('.button.enter');//寻找确定按钮
            this.close = this.dom.querySelector('.button.close');//寻找取消按钮

            var data = this.options.data || [];
            for(var i=0; i<data.length; i++) {
                this.left.innerHTML += '<li data-value="'+data[i].value+'">'+data[i].text+'</li>';
            }
            this.items = this.left.querySelectorAll('li');
        },
        bind: function() {
            var _this = this;
            if(this.options.onOk) {
                this.enter.onclick = this.options.onOk.bind(_this);
            }
            this.close.onclick = function() {
                _this.hide();//隐藏组件
            }
            this.add.onclick = this._operaClick.bind(this,this.add);
            this.del.onclick = this._operaClick.bind(this,this.del);
            for(var i=0; i<this.items.length; i++) {
                this.items[i].onclick = this._itemClick;
            }
        },
        show: function() {
            this.dom.style.display = 'flex';
            this.status = 1;
        },
        hide: function() {
            this.dom.style.display = 'none';
            this.status = 0;
        },
        getValues: function() {
            var values = [];
            var selecteds = this.right.querySelectorAll('li');
            for(var i=0; i<selecteds.length; i++) {
                values.push(selecteds[i].getAttribute('data-value'));
            }
            return values;
        },
        _operaClick: function(target) {
            var one,two;
            if(target.className.indexOf('add') !== -1) {
                one = this.left;
                two = this.right;
            }else{
                one = this.right;
                two = this.left;
            }
            //拿到left下所有被选中的li（li.selected）
            let selecteds = one.querySelectorAll('li.selected');
            //往right里面append
            for(var i=0; i<selecteds.length; i++){
                two.appendChild(selecteds[i]);
            }
        },
        _itemClick: function() {
            if(this.className.indexOf('selected') !== -1) {
                this.className = '';
            }else{
                this.className = 'selected';
            }
        }
    };

    return UserRuleSelect;
})();