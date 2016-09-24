var Btn = React.createClass({
    getInitialState(){
        return {
            name:'小明'
        }
    },
    // 这是我们写的点击事件方法
    handleClick(){
        // 事件里的this应该当前事件对象.
        // console.log('我被点了'); //
        this.setState({ // 现在的this指的组件对象，react帮助我们做处理了.
          name:'小红'
        })
        console.log(this.state)
    },
    render(){
        return (
            <div>
                <button onClick={this.handleClick}>我是{this.state.name},你点我吧</button>
            </div>
        );
    }
});

ReactDOM.render(
    <Btn />,
    document.getElementById('box')
);