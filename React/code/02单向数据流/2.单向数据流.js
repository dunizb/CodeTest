'use strict';

var Input = React.createClass({
    displayName: 'Input',

    // 该方法用来初始化this.state对象,this.state可以类比angular的$scope
    getInitialState: function getInitialState() {
        return {
            name: 'Dunizb',
            age: 18
        };
    },

    //当该组件加载到页面后执行该方法
    componentDidMount: function componentDidMount() {
        // this.state.name='小明' //不要在组件加载之后直接改变this.state的值.
        // 这个方法是用来改变this.state的值的
        this.setState({
            name: '小天' // 只写一个name，表示只改name这个属性.
        });
    },
    render: function render() {
        // 下面的会覆盖上面定义的同名属性，不同属性会进行合并
        // this.setState({
        //     name:'小明'
        // });
        return React.createElement(
            'div',
            null,
            '我爱中国  ',
            React.createElement('input', { type: 'text', value: this.state.name })
        );
    }
});

// 渲染组件,只有一个方法
ReactDOM.render(React.createElement(Input, null), document.getElementById('box'));
