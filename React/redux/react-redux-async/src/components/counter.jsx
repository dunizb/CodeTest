import React, { Component } from 'react'
import PropTypes from 'prop-types'
 
export default class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementByAsync: PropTypes.func.isRequired
    }
    increment = () => {
        let number = this.select.value*1
        // 调用store的方法更新状态
        this.props.increment(number)
    }
    decrement = () => {
        let number = this.select.value*1
        this.props.decrement(number)
    }
    incrementIfOdd = () => {
        let number = this.select.value*1
        let count = this.props.count
        if(count % 2 === 1) {
            this.props.increment(number)
        }
    }
    incrementAsync = () => {
        let number = this.select.value*1
        this.props.incrementByAsync(number)
    }
    render() {
        const {count} = this.props
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