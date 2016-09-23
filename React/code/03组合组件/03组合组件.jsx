// 创建评论组件
let CommonList = React.createClass({
    render(){
        return (
            <div>
                <span>{this.props.item}</span>
            </div>
        );
    }
});

// 创建评论框组件
let CommonBox = React.createClass({
    render(){
        // 假设这里你已经拿到数据
        // var data = ["我看了，没问题","我是中国人，我爱自己的祖国。",
        // "小明，你知道小红在哪里吗?"]
        let data = ["我看了，没问题","我是中国人，我爱自己的祖国。","小明，你知道小红在哪里吗?"];
        return (
            <div>
                <h1>以下是评论</h1>
                {data}
                <h2>-----华丽的分割线-----</h2>
                {
                    data.map( function(item,index){
                        return <CommonList key={index} item={item} />
                    })
                }
                <input type="text" /><button>发表评论</button> 
            </div>
        );
    }
});

ReactDOM.render(
    <CommonBox />,
    document.getElementById('box')
);