'use strict';

var Input = React.createClass({
    displayName: 'Input',

    getInitialState: function getInitialState() {
        return { value: 'hello' };
    },
    handleChange: function handleChange(event) {
        this.setState({ value: event.target.value });
    },
    render: function render() {
        var value = this.state.value;
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', value: value, onChange: this.handleChange }),
            React.createElement(
                'p',
                null,
                value
            )
        );
    }
});

ReactDOM.render(React.createElement(Input, null), document.body);
