import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0
    }
    increment = () => {
        let number = this.select.value*1
        let count = this.state.count
        this.setState({ count: count + number })
    }
    decrement = () => {
        let number = this.select.value*1
        let count = this.state.count
        this.setState({ count: count - number })
    }
    incrementIfOdd = () => {
        let number = this.select.value*1
        let count = this.state.count
        if(count % 2 === 1) {
            this.setState({ count: count + number })
        }
    }
    incrementAsync = () => {
        let number = this.select.value*1
        let count = this.state.count
        setTimeout(() => {
            this.setState({ count: count + number })
        }, 1000);
    }
    render() {
        const {count} = this.state
        return (
            <div>
                <p>clikc {count} items</p>
                <div>
                    <select ref={select => this.select = select}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.incrementIfOdd}>increment if odd</button>
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )   
    }
}