'use strict';

// 创建组件
var CommonList = React.createClass({
    displayName: 'CommonList',
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'span',
                null,
                this.props.item,
                '，么有问题'
            )
        );
    }
});

// 评论框组件
var CommonBox = React.createClass({
    displayName: 'CommonBox',
    render: function render() {
        // var data = ['微信小程序内测了','AngularJS2.0发不了','HTML5.1也发布了'];
        var data = [{ title: '微信小程序内测了', desc: '微信' }, { title: 'AngularJS2.0发不了', desc: 'Angular' }, { title: 'HTML5.1也发布了', desc: 'html' }];
        return React.createElement(
            'div',
            null,
            data.map(function (item, index) {
                return React.createElement(CommonList, { key: index, item: item.title });
            })
        );
    }
});

ReactDOM.render(React.createElement(CommonBox, null), document.getElementById('box'));
