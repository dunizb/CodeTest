let btnStyle = {
    width:'100px',
    height:'30px',
    lineHeight:'30px',//有横杠的改成驼峰命名法
    background:'#F05C5C',
    borderRadius:'4px'
}

// 创建一个组件
// 名字一定大写开头
var Btn = React.createClass({
    // 用来渲染相应组建的呃
    // 用来渲染相应组建的呃
    render(){
        // return 不要单独写在一行，如果非要写在一行，请用括号把后面的内容包括起来
        // 如果使用类样式的形式操作样式，需要把class改成className 
        return <button style={btnStyle} className='btn' >我是一个按钮</button>
    } 
});


// 将组建渲染到页面中去
ReactDOM.render(
    //用标签的形式去书写组建，可以用单表情也可以用双标签
    <Btn/>, 
    //制定一个DOM元素，最终会把DOM元素渲染到该DOM中
    document.getElementById("box")
); 