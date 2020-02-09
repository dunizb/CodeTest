import React from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

import Main from './Main'
import About from './about'
import Topic from './topic'

export default class Home extends React.Component {

    render() {
        return (
            <HashRouter>
                <h1>router-demo/router1</h1>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                </div>
                <hr/>
                <Switch>
                    <Route exact path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Switch>
            </HashRouter>
        );
    }
}
