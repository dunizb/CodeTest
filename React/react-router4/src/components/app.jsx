import React, { Component } from 'react'
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'

import './app.css'
import Home from '../views/home'
import About from '../views/about'

class App extends Component {
    render() {
        return (
            <div>
                <h1>React Router Demo</h1>
                <div className="links">
                    <ul>
                        <li><NavLink to="/home">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                </div>
                <div className="main">
                    <Switch>
                        <Route path='/about' component={About} />
                        <Route path='/home' component={Home} />
                        <Redirect to='/about' />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App