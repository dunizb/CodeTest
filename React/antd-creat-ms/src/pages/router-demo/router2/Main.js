import React from 'react'
import { Link } from 'react-router-dom'
export default class Main extends React.Component {

    render() {
        return (
            <div>
                this is main page.
                <Link to="/main/a">嵌套路由</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}
