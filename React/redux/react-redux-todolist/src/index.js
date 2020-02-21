import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

import { Provider } from 'react-redux'
import store from './store'

const App = (
    <Provider store={store}>
        <TodoList />
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

