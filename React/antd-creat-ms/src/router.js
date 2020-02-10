import React from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom'

import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Gallery from './pages/gallery'
import Login from './pages/form/login'
import NoMatch from './pages/nomatch'

export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                 <App>
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/gallery" component={Gallery} />
                                <Route path="/admin/gallery" component={Gallery} />
                                <Route path="/admin/form/login" component={Login} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>        
                </App>    
            </HashRouter>
        );
    }
}
