import React from 'react'
import './index.less'
import { Button, Alert } from 'antd';
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
            <Alert message="React 生命周期" type="success" />
            <Button type="primary" onClick={this.handleAdd}>点击一下</Button>
            <p>{this.state.count}</p>
        </div>
    }
}