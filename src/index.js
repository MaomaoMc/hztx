import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Account from './account/index.js';
import HomePage from './main/index.js';
import Deal from './deal/index.js';
import PersonalData from './account/PersonalData';
import "./css/common.css";
import registerServiceWorker from './registerServiceWorker';
import Task from './task/index.js';
import KjMarket from './kjMarket/index.js';
// import Main from './main/index.js';
import TaskDetail from './task/TaskDetail.js';
import NoticeDetail from './main/NoticeDetail.js';
import Register from './Register.js';
import ForgetPwd from './account/ForgetPwd.js';
import Introduce from './main/Introduce.js';


ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/main/noticeDetails" component={NoticeDetail} />  {/*公告详情*/}
                <Route path="/main" component={HomePage} />  {/*主页*/}
                <Route path="/task" component={Task} />  {/*主页*/}
                <Route path="/introduce" component={Introduce} />  {/*公司简介*/}
                <Route path="/kjMarket" component={KjMarket} />  {/*矿机  跳转到矿机商城*/}
                <Route path="/deal" component={Deal} />
                <Route path="/account/personalData" component = {PersonalData} />
                <Route path="/register" component={Register} />
                <Route path="/forgetPwd/:type" component={ForgetPwd} /> {/*忘记密码*/}
                <Route path="/" component={Account} />
            </Switch>
        </div>
    </Router>
    ,
    document.getElementById('root')
)
registerServiceWorker();
