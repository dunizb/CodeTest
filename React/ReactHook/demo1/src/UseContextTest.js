import React, { useState, createContext, useContext } from 'react';

const CounterContext = createContext();

function Counter(){
    const count = useContext(CounterContext) //一句话就可以得到count
    return (<h5> 子组件count：{count}</h5>)
}

function UseContextTest(){
    const [count, setCount] = useState(0)
    return (
        <div>
            <h3>useContext用法</h3>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count+1)}>Click me</button>
            {/* 关键代码 */}
            <CounterContext.Provider value={count}>
                <Counter />
            </CounterContext.Provider>
        </div>
    );
}
 
export default UseContextTest;
