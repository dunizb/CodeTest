var Input = React.createClass({
    getInitialState:function(){
        return {value:'hello'}
    },
    handleChange:function(event){
        this.setState({value: event.target.value});
    },
    render:function(){
        var value = this.state.value;
        return (
            <div>
                <input type='text' value={value} onChange={this.handleChange} />
                <p>{value}</p>
            </div>
        );
    }
});

ReactDOM.render(<Input/>,document.body);