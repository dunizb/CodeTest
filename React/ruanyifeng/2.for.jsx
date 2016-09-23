var fromworks = ['AngularJS','ReactJS','Vue.js','Ionic'];

ReactDOM.render(
    <div>
        {
            fromworks.map(function(name){
                return <h1>Hello,{name}</h1>
            })
        }
    </div>,
    document.getElementById('box')
);