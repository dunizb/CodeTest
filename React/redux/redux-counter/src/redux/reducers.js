/**
 * 包含 n 个 reducer 函数的模块
 */
import {INCREMENT, DECREMENT} from './action-types'
export function counter(state = 0, action) {
    console.log('counter()', state, action)
    switch(action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data    
        default:
            return state
    }
} 