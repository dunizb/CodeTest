// 创建组件
let CommonList = React.createClass({
    render(){
        return (
            <div>
                <span>{this.props.item}，么有问题</span>
            </div>
        );
    }
});

// 评论框组件
let CommonBox = React.createClass({
    render(){
        // var data = ['微信小程序内测了','AngularJS2.0发不了','HTML5.1也发布了'];
        let data = [
            {title:'微信小程序内测了',desc:'微信'},
            {title:'AngularJS2.0发不了',desc:'Angular'},
            {title:'HTML5.1也发布了',desc:'html'}
        ];
        return (
            <div>
                {
                    data.map(function(item,index){
                        return <CommonList key={index} item={item.title} />
                    })
                }
            </div>
        );
    }
});

ReactDOM.render(<CommonBox />,document.getElementById('box'));