import { DATA_LIST, CHANGE_INPUT , ADD_ITEM , DELETE_ITEM } from './actionTypes'

const defaultState = {
    inputValue: 'Write Something',
    list: [
        '早8点晨会，分配今天的代码任务',
        '早9点和项目经理开沟通会'
    ]
}

export default (state = defaultState, action) => {
    console.log(state, action);
    // Reducer里只能接收state，不能改变state
    if(action.type === CHANGE_INPUT) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === ADD_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if(action.type === DELETE_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1)
        return newState;
    }
    if(action.type === DATA_LIST) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = newState.list.concat(action.value)
        return newState;
    }
    return state;
}
