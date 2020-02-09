import React from 'react'
import { Link } from 'react-router-dom'
export default class Main extends React.Component {

    render() {
        return (
            <div>
                this is main page.
                <br/>
                <Link to="/main/a">嵌套路由</Link>
                <br/>
                <Link to="/main/b">动态路由b</Link>&nbsp;
                <Link to="/main/c">动态路由c</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}
