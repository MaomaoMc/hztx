import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render(){
        const hash = window.location.hash;
        return <div className = "footer"> 
           <ul className = "f_flex">
                <li className = {hash.indexOf("main") !== -1 ? "active" : ""}>
                    <Link to = "/main">
                        <i className = "icon_main"> </i>
                        <span>主页</span>
                    </Link>
                </li>
                <li className = {hash.indexOf("task") !== -1 ? "active" : ""}>
                    <Link to = "/task">
                        <i className = "icon_task"></i>
                        <span>任务中心</span>
                    </Link>
                </li>
                <li className = {hash.indexOf("kjMarket") !== -1 ? "active" : ""}>
                    <Link to = "/kjMarket"> 
                        <i className = "icon_kj"></i>
                        <span>金豆中心</span>
                    </Link>
                </li>
                <li className = {hash.indexOf("deal") !== -1 ? "active" : ""}>
                    <Link to = "/deal">
                        <i className = "icon_jy"></i>
                        <span>交易中心</span>
                    </Link>
                </li>
                <li className = {hash.indexOf("account") !== -1 ? "active" : ""}>
                    <Link to = "/account/personalData">
                        <i className = "icon_account"></i>
                        <span>用户中心</span>
                    </Link>
                </li>
           </ul>
        </div>
    }
}

export default Footer;