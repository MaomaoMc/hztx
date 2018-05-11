import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
// import './index.css';
// import App from './App';
import Account from './account/index.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                {/* <Route  path="/machineMarket" component={MachineM} />
                <Route  path="/mineralPool" component={MineralPool} />
                <Route path="/deal" component={Deal} />
                <Route path="/newerGdNotes" component={NewerGdNotes} /> */}
                <Route path="/" component={Account} />
            </Switch>
        </div>
    </Router>
    ,
    document.getElementById('root')
)
registerServiceWorker();
