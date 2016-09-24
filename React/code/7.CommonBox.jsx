var React = require('react')
var ReactDOM =  require('react-dom')

// 引入评论组件
var CommonList = require('./7.CommonList.jsx')

// 创建评论框组件
var CommonBox = React.createClass({
  render:function(){
    return (
      <div>
        <h1>终于看到评论啦!!!</h1>
        <CommonList />
      </div>
    );
  }
});

// 渲染组件
ReactDOM.render(
  <CommonBox />,
  document.getElementById('box')
);