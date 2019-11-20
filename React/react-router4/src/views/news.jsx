import React, { Component }  from 'react'
// import MyNavLink from '../components/my-nav-link'
export default class News extends Component {
    state = {
        newsList: ['news001', 'news002', 'news003']
    }
    render() {
        return (
            <ul>
                {
                    this.state.newsList.map((news, index) => <li key={index}>{news}</li>)
                }
            </ul>
        )
    }
}