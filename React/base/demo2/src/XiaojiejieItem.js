import React, { PureComponent } from 'react'

class XiaojiejieItem extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li onClick={this.handleClick}>{this.props.content}</li>
        )
    }

    handleClick = () => {
        console.log(this.props.index);
        this.props.deleteItem(this.props.index)
    }
}

export default XiaojiejieItem
