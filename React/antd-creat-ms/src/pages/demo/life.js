import React from 'react'
import './index.less'

export default class Life extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return <div className="content">
            <h1>React 生命周期</h1>
            <button onClick={this.handleAdd}>点击一下</button>
            <p>{this.state.count}</p>
        </div>
    }
}