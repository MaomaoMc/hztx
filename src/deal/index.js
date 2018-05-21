import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
// import './../css/account.css';
import Nav from './../Nav';
import DealCenter from './DealCenter';
import MyDeal from './MyDeal';

const deal_nav = [
    {
        text: "买入大厅",
        link: "/deal",
    },
    {
        text: "交割大厅",
        link: "/deal/publishTask"
    },
    {
        text: "我的买单",
        link: "/deal/mydeal/buylist"
    },
    {
        text: "我的卖单",
        link: "/deal/mydeal/selllist"
    }
]
class Deal extends Component {
    render(){
        return <div> 
            <Nav  nav = {JSON.stringify(deal_nav)} />
            <Switch>
                {/* <Route path="/account/myMiner" component = {MyMiner} /> */}
                <Route path="/deal/mydeal" component = {MyDeal} />
                <Route path="/deal" component = {DealCenter} />
            </Switch>
        </div>
    }
}

export default Deal;