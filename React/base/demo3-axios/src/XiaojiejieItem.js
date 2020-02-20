import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

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

XiaojiejieItem.propTypes = {
    content: PropTypes.string,
    index: PropTypes.number,
    deleteItem: PropTypes.func
}

export default XiaojiejieItem
