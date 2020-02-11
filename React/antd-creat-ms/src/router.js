import React from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom'

import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Gallery from './pages/gallery'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import NoMatch from './pages/nomatch'
import TableBasic from './pages/table/basicTable'

export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                 <App>
                    <Route path="/" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/gallery" component={Gallery} />
                                <Route path="/form/formLogin" component={FormLogin} />
                                <Route path="/form/formRegister" component={FormRegister} />
                                <Route path="/table/basic" component={TableBasic} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>        
                </App>    
            </HashRouter>
        );
    }
}
