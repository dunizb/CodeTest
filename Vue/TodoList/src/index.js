/*
* index.js
* 项目入口文件
* */
import Vue from 'vue'
import App from './app.vue'

import Notification from './components/notification';
Vue.use(Notification);
import Tabs from './components/tabs';
Vue.use(Tabs);

// 引入全局CSS样式
import './assets/styles/global.styl'

// 在body下创建一个根节点
const root = document.createElement('div');
document.body.appendChild(root);

// 获取Bing每日壁纸
const img = '//api.dujin.org/bing/1920.php';
document.body.style.backgroundImage = `url(${img})`

// 将根节点root注入到app.vue组件中
new Vue({
    el: '#root',
    render: (h) => h(App)
}).$mount(root);