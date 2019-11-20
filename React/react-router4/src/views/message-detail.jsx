import React, { Component }  from 'react'

const allMessageList = [
    {
        id: 1,
        title: 'message001',
        content: '我爱你，中国'
    },
    {
        id: 2,
        title: 'message002',
        content: '我爱你，React'
    },
    {
        id: 3,
        title: 'message003',
        content: '我爱你，JavaScript'
    }
]
export default class MessageDetail extends Component {
    render() {
        const {id} = this.props.match.params
        let content = allMessageList.find(item => item.id.toString() === id)
        return (
            <ul>
                <li>ID：{content.id}</li>
                <li>TITLE：{content.title}</li>
                <li>CONTENT：{content.content}</li>
            </ul>
        )
    }
}