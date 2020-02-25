import React from 'react';
import Example from './Example'
import Example2 from './Example2'
import ExampleHook from './ExampleHook'
import ExampleHook2 from './ExampleHook2'
import UseEffectTest from './UseEffectTest'
import UseEffectTest2 from './UseEffectTest2'
import UseContextTest from './UseContextTest'
import ReducerDemo from './ReducerDemo'
import Example3 from './example3/Example3'
import WinResize from './WinResize'

import './App.css'

function App() {
  return (
    <div>
      <div style={{display:'flex',alignItems: 'center'}}>
        <h1>React Hook Demo</h1>
        &nbsp;
        <a href="https://github.com/dunizb/CodeTest/React/ReactHook/demo1" rel="noopener noreferrer" target="_blank">查看源代码</a>
      </div>
      <hr />
      <div className="flex">
        <Example />
        <ExampleHook />
      </div>
      <hr />
      <ExampleHook2 />
      <hr />
      <div className="flex">
        <Example2 />
        <UseEffectTest />
      </div>
      <hr />
      <UseEffectTest2 />
      <hr />
      <UseContextTest />
      <hr />
      <ReducerDemo />
      <hr />
      <Example3 />
      <hr />
      <WinResize />
    </div>
  );
}

export default App;
