import React, { Component } from 'react';

class Example2 extends Component {
    state = { count: 0 }
    render() { 
        return (
            <div>
                <h3>用Class的方式为计数器增加生命周期函数</h3>
                <p>You clicked {this.state.count} times.</p>
                <button onClick={this.addCount}>Click me</button>
            </div>
        );
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    addCount = () => {
        this.setState({ count: this.state.count+1 })
    }
}
 
export default Example2;
