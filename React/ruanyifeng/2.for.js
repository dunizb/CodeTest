'use strict';

var fromworks = ['AngularJS', 'ReactJS', 'Vue.js', 'Ionic'];

ReactDOM.render(React.createElement(
    'div',
    null,
    fromworks.map(function (name) {
        return React.createElement(
            'h1',
            null,
            'Hello,',
            name
        );
    })
), document.getElementById('box'));
