import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
// import './../css/account.css';
import DealCenter from './DealCenter';

class Deal extends Component {
    render(){
        return <div> 
            <Switch>
                {/* <Route path="/account/myMiner/running" component = {MinerRunning} />
                
                <Route path="/account/minerUnion" component = {MinerUnion} />
                <Route path="/account/myUnion" component = {MyUnion} />
                <Route path="/account/minerNetWork" component = {MinerNetWork} />
                <Route path="/account/myMiner" component = {MyMiner} /> */}
                <Route path="/deal" component = {DealCenter} />
            </Switch>
        </div>
    }
}

export default Deal;