import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Market from "./Market";
import Nav from "./../Nav";
import MinerEarnings from './MinerEarnings';
import MyMiner from './MyMiner';

const kj_nav = [
    {
        text: "金豆中心",
        link: "/kjMarket",
    },
    {
        text: "我的矿工",
        link: "/kjMarket/myminer"
    },
    {
        text: "收益",
        link: "/kjMarket/minerEarnings"
    }
]
class KjMarket extends Component {
    render(){
        return <div> 
            <Nav  nav = {JSON.stringify(kj_nav)} />
            <Switch>
                <Route path="/kjMarket/myminer" component = {MyMiner} />
                <Route path="/kjMarket/minerEarnings" component = {MinerEarnings} />
                <Route path="/kjMarket" component = {Market} />
            </Switch>
        </div>
    }
}

export default KjMarket;