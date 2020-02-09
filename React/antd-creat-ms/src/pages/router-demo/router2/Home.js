import React from 'react'
import { Link } from 'react-router-dom'
export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h2>router-demo/router2</h2>
                <ul>
                    <li>
                        <Link to="/main">Home1</Link>
                    </li>
                    <li>
                        <Link to="/about">About1</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics1</Link>
                    </li>
                    <li>
                        <Link to="/404">404</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}
