import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟，你来了！Index页面');
        return () => {
            console.log('老弟，你走了!Index页面')
        }
    }, []);
    return <h5>This is Index Page</h5>;
}

function List() {
    useEffect(()=>{
        console.log('useEffect=>老弟，你来了！List页面')
    });
    return <h5>Welcome to List Page</h5>;
}

function UseEffectTest2(){
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(`useEffect => You clicked ${count} times.`);
        return ()=>{
            console.log('====================')
        }
    }, [count]);
    return (
        <div>
            <h3>useEffect 实现 componentWillUnmount 生命周期函数</h3>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count+1)}>Click me</button>
            <Router>
                <ul>
                    <li><Link to="/">Index Page</Link></li>
                    <li><Link to="/list">List Page</Link></li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list" component={List} />
            </Router>
        </div>
    )
}
 
export default UseEffectTest2;
