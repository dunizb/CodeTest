var UserRuleSelect = function(options) {
    this.init(options || {});//渲染DOM结构
    this.render();//渲染DOM结构
};

var html = '<ul id="left-list" class="data-list">'
            +'<li>系统管理员</li>'
            +'<li>部门经理</li>'
            +'<li>部门主管</li>'
            +'<li>销售经理</li>'
            +'<li>财务会计</li>'
            +'<li>财务出纳</li>'
        +'</ul>'
        +'<div class="data-oper">'
            +'<a href="#" id="add" class="button">添加</a>'
            +'<a href="#" id="del" class="button">删除</a>'
        +'</div>'
        +'<ul id="right-list" class="data-list"></ul>';

UserRuleSelect.prototype = {
    init: function(options) {
        this.options = options; //初始化参数
        this.dom = document.createElement('div');
        this.dom.className = 'container user-rule-select';
        this.dom.style.display = this.options.defaultShow ? 'flex' : 'none';//由用户决定是否初始化显示
        this.status = this.options.defaultShow ? 0 : 1;//0隐藏、1显示
        document.body.appendChild(this.dom);
    },
    render: function() {
        this.dom.innerHTML = html;
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
