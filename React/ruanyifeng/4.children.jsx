var NotesList = React.createClass({
    render : function(){
        return (
            <ol>
            {
                React.Children.map(this.props.children,function(child){
                    return <li>{child}</li>
                })
            }
            </ol>
        );
    }
});

ReactDOM.render(
    <NotesList>
        <span>Hello</span>
        <span>World</span>
    </NotesList>,
    document.getElementById('box')
);        