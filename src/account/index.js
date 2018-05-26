import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './../css/account.css';
import Login from './Login';
import MinerUnion from './MinerUnion';
import MyUnion from './MyUnion';
import MinerNetWork from './MinerNetWork';
// import MyMiner from './MyMiner';
import MinerRunning from './MinerRunning';
// import MyDeal from './MyDeal';
// import MinerEarnings from './MinerEarnings'; //矿机收益
import PersonalItems from './PersonalItems';
import MyWallet from './MyWallet';
import SsDeal from './SsDeal';
import Help from './Help';
import PwdControl from './PwdControl';
import ContactUs from './ContactUs';
// import PublishTask from './PublishTask';
// import MyPedTasks from './MyPedTasks';
// import MyAcceptTasks from './MyAcceptTasks';
// import ExamineTask from './ExamineTask';
import Spead from './Spread';
import ReCharge from './ReCharge';
import FeedBack from './FeedBack';
import AppDown from './AppDown';
import JDMarket from './JDMarket';
import JDAuction from './JDAuction';
import JDGame from './JDGame';
import BusinessCoop from './BusinessCoop';
import JDTask from './JDTask';
import JDtaskDetail from './JDtaskDetail';
import JDmyAcceptTask from './JDmyAcceptTask';
import JDSubmitTask from './JDSubmitTask';
import Speads from './Speads';

class Account extends Component {
    render(){
        return <div> 
            <Switch>
                <Route path="/account/myMiner/running" component = {MinerRunning} />
                {/* <Route path="/account/myMiner" component = {MyMiner} /> */}
                {/* <Route path="/account/mydeal" component = {MyDeal} /> */}
                {/* <Route path="/account/minerEarnings" component = {MinerEarnings} /> */}
                <Route path="/account/personalItems" component = {PersonalItems} />
                {/* <Route path="/account/publishTask" component = {PublishTask} />
                <Route path="/account/myPedTasks" component = {MyPedTasks} />
                <Route path="/account/myAcceptTasks" component = {MyAcceptTasks} /> */}
                {/* <Route path="/account/examineTask/:id" component = {ExamineTask} /> */}
                <Route path="/account/recharge" component = {ReCharge} />
                <Route path="/account/MyWallet" component = {MyWallet} />
                <Route path="/account/ssDeal" component = {SsDeal} />
                <Route path="/account/speads/:id" component = {Speads} />
                <Route path="/account/spead" component = {Spead} />
                <Route path="/account/help" component = {Help} />
                <Route path="/account/pwdControl" component = {PwdControl} />
                <Route path="/account/contactUs" component = {ContactUs} />
                <Route path="/account/feedback" component = {FeedBack} />
                <Route path="/account/minerUnion" component = {MinerUnion} />
                <Route path="/account/myUnion" component = {MyUnion} />
                <Route path="/account/minerNetWork" component = {MinerNetWork} />
                <Route path="/account/jdtaskDetail/:id" component = {JDtaskDetail} />
                <Route path="/account/jdmyAcceptTask" component = {JDmyAcceptTask} />
                <Route path="/account/jdsubmitTask/:id" component = {JDSubmitTask} />
                <Route path="/account/jdTask" component = {JDTask} />
                <Route path="/account/appdown" component = {AppDown} />
                <Route path="/account/jdMarket" component = {JDMarket} />
                <Route path="/account/jdAuction" component = {JDAuction} />
                <Route path="/account/jdGame" component = {JDGame} />
                <Route path="/account/businessCoop" component = {BusinessCoop} />
                
                <Route path="/" component = {Login} />
            </Switch>
        </div>
    }
}

export default Account;