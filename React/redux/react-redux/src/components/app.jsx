import React, { Component } from 'react'

import * as actions from '../redux/actions'

export default class App extends Component {
    increment = () => {
        let number = this.select.value*1
        // 调用store的方法更新状态
        this.props.store.dispatch(actions.increment(number))
    }
    decrement = () => {
        let number = this.select.value*1
        this.props.store.dispatch(actions.decrement(number))
    }
    incrementIfOdd = () => {
        let number = this.select.value*1
        let count = this.props.store.getState()
        if(count % 2 === 1) {
            this.props.store.dispatch(actions.increment(number))
        }
    }
    incrementAsync = () => {
        let number = this.select.value*1
        setTimeout(() => {
            this.props.store.dispatch(actions.increment(number))
        }, 1000);
    }
    render() {
        const count = this.props.store.getState()
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