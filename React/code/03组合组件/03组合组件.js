"use strict";

// 创建评论组件
var CommonList = React.createClass({
    displayName: "CommonList",
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "span",
                null,
                this.props.item
            )
        );
    }
});

// 创建评论框组件
var CommonBox = React.createClass({
    displayName: "CommonBox",
    render: function render() {
        // 假设这里你已经拿到数据
        // var data = ["我看了，没问题","我是中国人，我爱自己的祖国。",
        // "小明，你知道小红在哪里吗?"]
        var data = ["我看了，没问题", "我是中国人，我爱自己的祖国。", "小明，你知道小红在哪里吗?"];
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "以下是评论"
            ),
            data,
            React.createElement(
                "h2",
                null,
                "-----华丽的分割线-----"
            ),
            data.map(function (item, index) {
                return React.createElement(CommonList, { key: index, item: item });
            }),
            React.createElement("input", { type: "text" }),
            React.createElement(
                "button",
                null,
                "发表评论"
            )
        );
    }
});

ReactDOM.render(React.createElement(CommonBox, null), document.getElementById('box'));
