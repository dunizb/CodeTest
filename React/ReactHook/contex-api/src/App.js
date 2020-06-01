import React from "react";
import Context from "./context"
import Counter from "./components/Counter"
import CounterTitle from "./components/CounterTitle"
class App extends React.Component {
  state = {
    counter: 0
  }
  increment = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  decrement = () => {
    this.setState({
      counter: this.state.counter - 1
    });
  }
  render() {
    return (
      <React.Fragment>
        <Context.Provider value={{ counter: this.state.counter }}>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <CounterTitle />
            <div style={{ width: "300px", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <button onClick={this.increment}>Increment</button>
              <Counter />
              <button onClick={this.decrement}>Decrement</button>
            </div>
          </div>
        </Context.Provider>
      </React.Fragment >
    );
  }
}
export default App;
