import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Account from './account/index.js';
import Deal from './deal/index.js';
import PersonalData from './account/PersonalData';
import "./css/common.css";
import registerServiceWorker from './registerServiceWorker';
import TaskHall from './task/TaskHall.js';
import KjMarket from './kjMarket/index.js';
import Main from './main/index.js';
import TaskDetail from './task/TaskDetail.js';
import NoticeDetail from './main/NoticeDetail.js';
import Register from './Register.js';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                {/* <Route  path="/machineMarket" component={MachineM} />
                <Route  path="/mineralPool" component={MineralPool} />
                // 
                <Route path="/newerGdNotes" component={NewerGdNotes} /> */}
                <Route path="/main/noticeDetails" component={NoticeDetail} />  {/*公告详情*/}
                <Route path="/main" component={Main} />  {/*主页*/}
                <Route path="/taskHall" component={TaskHall} />  {/*任务  跳转到任务大厅*/}
                <Route path="/taskDetail/:id" component={TaskDetail} />  {/*任务详情*/}
                <Route path="/kjMarket" component={KjMarket} />  {/*矿机  跳转到矿机商城*/}
                <Route path="/deal" component={Deal} />
                 <Route path="/account/personalData" component = {PersonalData} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Account} />
            </Switch>
        </div>
    </Router>
    ,
    document.getElementById('root')
)
registerServiceWorker();
