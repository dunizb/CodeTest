import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Main from './Main'
import About from '../router1/about'
import Topic from '../router1/topic'
import Home from './Home'
import Info from './info'
import NoMatch from './NoMatch'

export default class IRouter extends React.Component {

    render() {
        return (
            <Router>
                <h1>嵌套路由和动态路由</h1>
                <Home>
                    <Switch>
                        <Route path="/main" render={()=>
                            <Main>
                                <Switch>
                                    <Route path="/main/a" component={About}></Route>
                                    <Route path="/main/:value" component={Info}></Route>                                 
                                </Switch>
                            </Main>   
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}
