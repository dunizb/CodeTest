import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import './app.css'
import MyNavLink from './my-nav-link'
import Home from '../views/home'
import About from '../views/about'

class App extends Component {
    render() {
        return (
            <div>
                <h1>React Router Demo</h1>
                <div className="links">
                    <ul>
                        <li><MyNavLink to="/home">Home</MyNavLink></li>
                        <li><MyNavLink to="/about">About</MyNavLink></li>
                    </ul>
                </div>
                <div className="main">
                    <Switch>
                        <Route path='/about' component={About} />
                        <Route path='/home' component={Home} />
                        <Redirect to='/about' />
                    </Switch>
                </div>
                <div style={{marginTop: '10px', background: 'pink'}}>
                    <a href="https://github.com/dunizb/CodeTest/tree/master/React/react-router4" rel="noopener noreferrer" target="_blank">查看源代码</a>
                </div>
            </div>
        )
    }
}

export default App
