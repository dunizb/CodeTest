import React from 'react';
import Example from './Example'
import ExampleHook from './ExampleHook'
import ExampleHook2 from './ExampleHook2'

function App() {
  return (
    <div>
      <div style={{display:'flex',alignItems: 'center'}}>
        <h1>React Hook Demo</h1>
        &nbsp;
        <a href="https://github.com/dunizb/CodeTest/React/ReactHook/demo1" rel="noopener noreferrer" target="_blank">查看源代码</a>
      </div>
      <hr />
      <Example />
      <ExampleHook />
      <hr />
      <ExampleHook2 />
    </div>
  );
}

export default App;
