import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {counter} from './reducers'

// 生产一个Store对象
const store = createStore(
    counter, 
    applyMiddleware(thunk)  // 应用异步中间件
)  // 内部会第一次调用reducer函数得到初始state
console.log('store', store);

export default store