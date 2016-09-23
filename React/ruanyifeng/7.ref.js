'use strict';

var MyComponent = React.createClass({
    displayName: 'MyComponent',

    handleClick: function handleClick() {
        var val = this.refs.myTextInput.value;
        alert(val);
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', ref: 'myTextInput' }),
            React.createElement('input', { type: 'button', value: 'Focus the text input', onClick: this.handleClick })
        );
    }
});

ReactDOM.render(React.createElement(MyComponent, null), document.getElementById('box'));
