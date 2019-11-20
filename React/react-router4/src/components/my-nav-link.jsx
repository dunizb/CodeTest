import React, { Component }  from 'react'
import {NavLink} from 'react-router-dom'

import './my-nav-link.css'

export default class MyNavLink extends Component {
    render() {
        return <NavLink {...this.props} activeClassName="active"/>
    }
}