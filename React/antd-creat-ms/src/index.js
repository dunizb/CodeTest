import React from 'react';
import ReactDOM from 'react-dom';

// import App from './App';
import './index.css'
// import Admin from './admin'
import Home from './pages/router-demo/router1/Home'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
