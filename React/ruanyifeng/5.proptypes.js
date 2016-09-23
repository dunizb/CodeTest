'use strict';

var MyTitle = React.createClass({
    displayName: 'MyTitle',

    propTypes: {
        title: React.PropTypes.string.isRequired
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

var data = 123;

ReactDOM.render(React.createElement(MyTitle, { title: data }), document.getElementById('box'));
