var HelloMessage = React.createClass({
    render : function(){
        return <h1>Hello {this.props.name}</h1>
    }
});

ReactDOM.render(
    <HelloMessage name='Dunizb' />,
    document.getElementById('box')
);