import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './../css/account.css';
import Main from './Main';
import Introduce from './Introduce';

class HomePage extends Component {
    render(){
        return <div> 
            <Switch>
                <Route path="/main/introduce" component = {Introduce} />
                <Route path="/main" component = {Main} />
            </Switch>
        </div>
    }
}

export default HomePage;