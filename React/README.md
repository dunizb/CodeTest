# React

[React入门及资源指引](https://segmentfault.com/a/1190000006495917?utm_source=tuicool&utm_medium=referral)

[React入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

## 什么是React,及组件化,JSX语法
  - 模块化(业务分割) //
  - 组件化(页面)  // 利用- html,css,js
  - 技术选型 // node,php/java/C# , angular,react,jquery//
  - 自动化构建及优化 gulp，grunt,webpack。
  - js模块化/css模块化,  less,sass ....
  - 组件化 , (view)
  - jsx语法，js+xml    document.createElement('div')
  - `<div><button></button></div>`
  - diff算法 //different   // virtual DOM

  - 遇到< 就当html解析，遇到{就当js解析。


## 初步使用
  - 需要安装react和react-dom
    + `npm install react react-dom --save`
  - 使用babel转换react的jsx语法，转换为js
    + `npm install -g babel-cli`
    + babel需要在项目根目录新建.babelrc文件,
      + presets:// 指定转换规则
       * presets:["react","es2015"]
      + 这些规则都需要安装相应的npm包
        - babel-preset-react：`npm install --save-dev babel-preset-react`
        - babel-preset-es2015：`npm install --save-dev babel-preset-es2015`
    + babel-core也需要安装：`npm install --save-dev babel-core`

    + 转换成ES5的语法：`babel 1.start.jsx -o 1.start.js`  
    

## 操作样式
  - 如果使用类样式的形式操作样式，需要把class改成className
  - for, forName

## 单向数据流
  - angular,双向数据绑定。
  - this.state这个对象相当于angular中的$scope（肯定是不一样的）,
  - 我们改变它的值最终会影响页面数据的显示.
  - 不要在组件加载完成之后直接给this.state赋值，如果要给值就使用this.setState({}) // 参数的属性就是想改变的值

  - *注意* 给文本框设置value值，如果使用的是this.state的属性赋值,默认就是只读的，需要手动设置onChange事件，在事件里改变this.state的属性值。
- 或者给文本框设置defaultValue值,只不过后续的改变this.state的属性值时文本框值不会改变


## 属性传播/属性扩散(spread attributes)
  - 可以在组件内部可以使用this.props对象得到组件在使用时的标签上的所以属性。
  - this.props就是组件标签所有属性的集合
  - 注册与this.state的区别
  - 其他的一些js操作都可以用原生的去写
  - 在遍历里可以不加key,如果添加key,要保证唯，且不支持输出复杂的对象


## 注册事件
 
## 生命周期
  - componentWillMount  // 表示当前组件即将要载入到页面
    - render()///
  - componentDidMount // 表示当前组件已经载入页面，相当dom树已经创建完成
  - componentWillUpdate // 当改变this.state的值时会触发组件更新，
  - componentDidUpdate // 表示当前组件已经更新
  - componentWillUnmount // 组件即将从页面移除


## 操作DOM
  - 一定在组件渲染完成之后操作，就像操作原生dom的方式去做
  - 也可以给组件里的dom元素加上ref属性，加上之后就可以在组件渲染完成之后 使用this.refs.[对应的属性值] 得到原生的dom对象。


## 组合组件 配合webpack
  - webpack使用
    + 1.全局安装:`npm install -g webpack`
    + 2.新建配置文件: webpack.config.js
    + 3.在新建的文件中书写具体的配置
    + 4.写完成之后就可以在当前项目根目录执行`webpack`命令
  - webpack命令
    + `webpack` 编译打包
    + `webpack --progress` 显示打包详细过程、进度
    + `webpack --watch` 监视文件变化，自动编译打包  

## 相关链接
  [React支持的事件](http://reactjs.cn/react/docs/events.html)
  [React支持的标签和属性](http://reactjs.cn/react/docs/tags-and-attributes.html)