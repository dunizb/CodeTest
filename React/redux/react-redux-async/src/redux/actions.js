import {INCREMENT, DECREMENT} from './action-types'
/**
 * 包含所有的action creator
 * 同步的action返回的是一个对象
 * 异步的action返回的是一个函数
 */
// 增加
export const increment = (number) => ({type: INCREMENT, data: number})
// 减少
export const decrement = (number) => ({type: DECREMENT, data: number})

// 异步action
export const incrementByAsync = (number) => {
    return dispatch => {
        // 异步代码
        setTimeout(() => {
            dispatch(increment(number))
        }, 1000);
    }
}