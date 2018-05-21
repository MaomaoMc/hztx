import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
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
        text: "我的矿机",
        link: "/kjMarket/myminer"
    },
    {
        text: "矿机收益",
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