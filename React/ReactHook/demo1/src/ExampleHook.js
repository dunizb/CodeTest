import React, { useState } from 'react';


function ExampleHook(){
    console.log('useState', useState(0));
    const [count, setCount] = useState(0)
    return (
        <div>
            <h3>计数器 useState 写法</h3>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count+1)}>Click me</button>
        </div>
    );
}
 
export default ExampleHook;
