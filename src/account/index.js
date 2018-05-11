import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import MinerUnion from './MinerUnion';

class Account extends Component {
    render(){
        return <div> 
            <Switch>
                <Route path="/account/minerUnion" component = {MinerUnion} />
                <Route path="/" component = {Login} />
            </Switch>
        </div>
    }
}

export default Account;