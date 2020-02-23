import React, { Component } from 'react';

class Example extends Component {
    state = { count: 0 }
    render() { 
        return (
            <div>
                <h3>计数器 Class 写法</h3>
                <p>You clicked {this.state.count} times.</p>
                <button onClick={this.addCount}>Click me</button>
            </div>
        );
    }
    addCount = () => {
        this.setState({ count: this.state.count+1 })
    }
}
 
export default Example;
