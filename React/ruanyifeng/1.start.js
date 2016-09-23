"use strict";

// 创建一个组件
// 名字一定大写开头
var Btn = React.createClass({
    displayName: "Btn",

    // 用来渲染相应组建的呃
    render: function render() {
        // return 不要单独写在一行，如果非要写在一行，请用括号把后面的内容包括起来
        return React.createElement(
            "button",
            null,
            "我是一个按钮"
        );
    }
});

// 将组建渲染到页面中去
ReactDOM.render(
//用标签的形式去书写组建，可以用单表情也可以用双标签
React.createElement(Btn, null),
//制定一个DOM元素，最终会把DOM元素渲染到该DOM中
document.getElementById("box"));
