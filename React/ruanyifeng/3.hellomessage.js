'use strict';

var HelloMessage = React.createClass({
    displayName: 'HelloMessage',

    render: function render() {
        return React.createElement(
            'h1',
            null,
            'Hello ',
            this.props.name
        );
    }
});

ReactDOM.render(React.createElement(HelloMessage, { name: 'Dunizb' }), document.getElementById('box'));
