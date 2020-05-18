import React from 'react';
import CountersWrapper from "./CountersWrapper";

function App() {
  return (
    <div>
      <CountersWrapper id={1} />
      <CountersWrapper id={2} />
      <CountersWrapper id={3} />
    </div>
  );
}

export default App;
