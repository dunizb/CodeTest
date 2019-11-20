import React, { Component } from 'react'
import logo from '../logo.svg'
import './app.css'

class App extends Component {
    render() {
        return (
            <div>
                <img src={logo} className="logo" alt="logo" />
                <p className="desc">React App 组件</p>
            </div>
        )
    }
}

export default App