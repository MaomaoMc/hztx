import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
// import './../css/account.css';
import Nav from './../Nav';
import DealCenter from './DealCenter';
import MyDeal from './MyDeal';
import ItemsDetails from './ItemsDetails';
import GatherHall from './GatherHall';

const deal_nav = [
    {
        text: "买入大厅",
        link: "/deal",
    },
    {
        text: "交割大厅",
        link: "/deal/gatherHall"
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
        const hash = window.location.hash;
        return <div> 
            {hash.indexOf("itemsDetails") === -1 ? <Nav  nav = {JSON.stringify(deal_nav)} /> : null}
            <Switch>
                <Route path="/deal/itemsDetails/:id" component = {ItemsDetails} />
                <Route path="/deal/mydeal" component = {MyDeal} />
                <Route path="/deal/gatherHall" component = {GatherHall} />
                <Route path="/deal" component = {DealCenter} />
            </Switch>
        </div>
    }
}

export default Deal;