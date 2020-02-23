import React, { useReducer } from 'react';

function ReducerDemo(){
    const [count, dispatch] = useReducer(counterReducer, 0);
    return(
        <div>
            <h3>useReducer的使用</h3>
            <div>加加减减: {count}</div>
            <button onClick={()=>dispatch('add')}>Increment</button>
            <button onClick={()=>dispatch('sub')}>Decrement</button>
        </div>
    )
}

function counterReducer(state, action){
    switch(action) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default: 
            return state;
    }
}

export default ReducerDemo;
