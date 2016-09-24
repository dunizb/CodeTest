'use strict';

var Btn = React.createClass({
    displayName: 'Btn',
    getInitialState: function getInitialState() {
        return {
            name: '小明'
        };
    },

    // 这是我们写的点击事件方法
    handleClick: function handleClick() {
        // 事件里的this应该当前事件对象.
        // console.log('我被点了'); //
        this.setState({ // 现在的this指的组件对象，react帮助我们做处理了.
            name: '小红'
        });
        console.log(this.state);
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { onClick: this.handleClick },
                '我是',
                this.state.name,
                ',你点我吧'
            )
        );
    }
});

ReactDOM.render(React.createElement(Btn, null), document.getElementById('box'));
