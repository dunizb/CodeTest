'use strict';

var MyTitle = React.createClass({
    displayName: 'MyTitle',

    getDefaultProps: function getDefaultProps() {
        return {
            title: 'Hello World!'
        };
    },
    render: function render() {
        return React.createElement(
            'h1',
            null,
            ' ',
            this.props.title,
            ' '
        );
    }
});

ReactDOM.render(React.createElement(MyTitle, null), document.getElementById('box'));
