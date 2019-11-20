import {createStore} from 'redux'

import {counter} from './reducers'

// 生产一个Store对象
const store = createStore(counter)  // 内部会第一次调用reducer函数得到初始state
console.log('store', store);

export default store