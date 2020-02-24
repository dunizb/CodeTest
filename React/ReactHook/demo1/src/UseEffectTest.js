import React, { useState, useEffect } from 'react';

function UseEffectTest(){
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            <h3>用 useEffect 的方式为计数器增加生命周期函数</h3>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count+1)}>Click me</button>
        </div>
    )
}
 
export default UseEffectTest;
