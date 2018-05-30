import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

class Title extends Component {
    constructor (props){
        super(props);
        this.state = {
            menuShow: false
        }
    }
    render(){
        if(this.props.code > 10000){  //token过期 回登陆页面去
            window.removeLocalItemsFun()
            return <Redirect to = "/" />
        }
        return <div> 
           <header>
               <span className = "f_lt" style = {{marginLeft: ".15rem"}}>
                <Link to = "/account/personalData" style = {{display: "block", width: ".75rem", height: ".75rem"}}>
                    <img src={localStorage.getItem("head_pic")} alt="" style = {{width: "100%", height: "100%"}}/>
                </Link>
               </span>
               <span>{this.props.title}</span>
               <span className = "f_rt">
                   <i className = "icon_menu" onClick = {e => {
                       this.setState({
                           menuShow: !this.state.menuShow
                       })
                   }}></i>
               </span>
           </header>
           <ul className = {this.state.menuShow ? "head_menu f_flex" : "head_menu f_flex hide"}>
                <li><Link to = "/main">我的主页</Link></li>
                <li><Link to = "/task">我的任务</Link></li>
                <li><Link to = "/kjMarket">我的金豆树</Link></li>
                <li><Link to = "/deal">我的交易</Link></li>
                <li><Link to = "/account/personalData">个人中心</Link></li>
            </ul>
        </div>
    }
}

export default Title;