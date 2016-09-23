var MyComponent = React.createClass({
    handleClick : function(){
        let val = this.refs.myTextInput.value;
        alert(val);
    },
    render : function(){
        return (
            <div>
                <input type='text' ref='myTextInput' />
                <input type='button' value='Focus the text input' onClick={this.handleClick} />
            </div>
        );
    }
});

ReactDOM.render(
    <MyComponent />,
    document.getElementById('box')
);