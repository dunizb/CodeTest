var MyTitle = React.createClass({
    getDefaultProps : function(){
        return {
            title : 'Hello World!'
        };
    },
    render : function(){
        return <h1> {this.props.title} </h1>
    }
});

ReactDOM.render(
    <MyTitle />,
    document.getElementById('box')
);