import { CHANGE_INPUT , ADD_ITEM } from './actionTypes'

const defaultState = {
    inputValue: 'Write Something',
    list: [
        '早8点晨会，分配今天的代码任务',
        '早9点和项目经理开沟通会'
    ]
}

export default (state = defaultState, action) => {
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
    return state;
}
