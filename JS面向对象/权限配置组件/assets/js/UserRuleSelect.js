var UserRuleSelect = function(options) {
    this.init(options || {});//渲染DOM结构
    this.bind();//绑定插件中DOM所需要的所有事件
};

var html = '<div class="user-rule-select">'
            +'<ul class="left-list data-list">'
            +'<li>系统管理员</li>'
            +'<li>部门经理</li>'
            +'<li>部门主管</li>'
            +'<li>销售经理</li>'
            +'<li>财务会计</li>'
            +'<li>财务出纳</li>'
        +'</ul>'
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

        this.enter = this.dom.querySelector('.button.enter');//寻找确定按钮
        this.close = this.dom.querySelector('.button.close');//寻找取消按钮

    },
    bind: function() {
        var _this = this;
        this.close.onclick = function() {
            _this.hide();//隐藏组件
        }
    },
    show: function() {
        this.dom.style.display = 'flex';
        this.status = 1;
    },
    hide: function() {
        this.dom.style.display = 'none';
        this.status = 0;
    }
};
