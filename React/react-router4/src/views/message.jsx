import React, { Component }  from 'react'
import {Switch, Route} from 'react-router-dom'

import MyNavLink from '../components/my-nav-link'
import MessageDetail from '../views/message-detail'

export default class Message extends Component {
    state = {
        messageList: []
    }
    componentDidMount() {
        // 模拟发送Ajax请求异步获取数据
       const messageList = [
            {
                id: 1,
                title: 'message001',
                content: 'message001message001message001message001'
            },
            {
                id: 2,
                title: 'message002',
                content: 'message002message002message002message002message002'
            },
            {
                id: 3,
                title: 'message003',
                content: 'message003message003message003message003'
            }
        ]
        setTimeout(() => {
            this.setState({ messageList })
        }, 1000);
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.messageList.map((msg, index) => (
                            <li key={index}>
                                <MyNavLink to={`/home/message/${msg.id}`}>{msg.title}</MyNavLink>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <Switch>
                        <Route path='/home/message/:id' component={MessageDetail} />
                    </Switch>
                </div>
            </div>
        )
    }
}