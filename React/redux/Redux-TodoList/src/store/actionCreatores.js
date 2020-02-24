import axios from 'axios'

import { 
    CHANGE_INPUT , 
    ADD_ITEM , 
    DELETE_ITEM, 
    DATA_LIST 
} from './actionTypes'

const baseUrl = 'https://www.fastmock.site/mock/6099b9719bd59b55a0f21894438cc412/react'
const API = {
    '/list': baseUrl + '/list'
}

export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

export const addItemAction = ()=>({
    type:ADD_ITEM
})

export const deleteItemAction = (index)=>({
    type: DELETE_ITEM,
    index
})

export const getListAction = (list)=>({
    type: DATA_LIST,
    value: list
})

export const getTodoList = (callback) => {
    return (dispatch) => {
        axios.get(API['/list']).then(res => {
            const list = res.data.data.list
            const action = getListAction(list);
            dispatch(action);
            callback();
        })
    }
}
