'use strict';

var LikeButton = React.createClass({
    displayName: 'LikeButton',

    getInitialState: function getInitialState() {
        return { liked: false };
    },
    handleClick: function handleClick(event) {
        this.setState({ liked: !this.state.liked });
    },
    render: function render() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return React.createElement(
            'p',
            { onClick: this.handleClick },
            'You ',
            text,
            ' this. Click to toggle.'
        );
    }
});

ReactDOM.render(React.createElement(LikeButton, null), document.getElementById('box'));
