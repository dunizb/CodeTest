import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/app'
import store from './redux/store'

function render() {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}
// 初始化渲染
render()

// 订阅监听(store中的状态变化了就会自动调用，进行重绘)
store.subscribe(render)

