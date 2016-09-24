var React = require('react') // 引入react
var ReactDOM = require('react-dom') // 引入react-dom

// 创建评论组件
var CommonList =  React.createClass({
  render:function(){
    return(
      <div>
        <p>我是评论，我来了</p>
      </div>
    );
  }
})


// 暴露出当前组件
module.exports = CommonList