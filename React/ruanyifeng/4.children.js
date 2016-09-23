'use strict';

var NotesList = React.createClass({
    displayName: 'NotesList',

    render: function render() {
        return React.createElement(
            'ol',
            null,
            React.Children.map(this.props.children, function (child) {
                return React.createElement(
                    'li',
                    null,
                    child
                );
            })
        );
    }
});

ReactDOM.render(React.createElement(
    NotesList,
    null,
    React.createElement(
        'span',
        null,
        'Hello'
    ),
    React.createElement(
        'span',
        null,
        'World'
    )
), document.getElementById('box'));
