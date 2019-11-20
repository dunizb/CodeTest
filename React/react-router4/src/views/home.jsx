import React, { Component }  from 'react'
import MyNavLink from '../components/my-nav-link'
import {Switch, Route, Redirect} from 'react-router-dom'

import News from '../views/news'
import Message from '../views/message'
export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>这里是<span style={{color: 'red'}}>Home</span>组件</h3>
                <div>
                    <MyNavLink to="/home/news">News</MyNavLink>
                    &nbsp;&nbsp;
                    <MyNavLink to="/home/message">Message</MyNavLink>
                </div>
                <hr />
                <div>
                    <Switch>
                        <Route path='/home/news' component={News}  />
                        <Route path='/home/message' component={Message}  />
                    </Switch>
                    <Redirect to='/home/news' />
                </div>
            </div>
        )
    }
}
