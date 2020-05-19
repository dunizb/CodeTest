import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './Login'


function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
    </Router>
  )
}

export default Main;
