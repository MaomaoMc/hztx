// 
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Title from "./Title";
import WarningDlg from "./WarningDlg";

const loginImg = require("./img/logo.jpg");
class Register extends Component {
    render(){
        return <div> 
           <Title title = "注册"/>
           <div className = "pb_100" style = {{marginTop: ".2rem"}}>
           <img src={loginImg} alt="" style={{width: "36%", marginLeft: "32%", marginTop: ".5rem", marginBottom: ".5rem"}}/>
                <ul className = "f_flex registerUl" style = {{padding: ".3rem"}}>
                   <li>
                       <label>手机号:</label>
                       <input type="password" placeholder = "请输入原登录密码" onChange = {e => {
                           this.handleIptChange({type: "oldl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>验证码:</label>
                       <input type="password" placeholder = "请输入收到的验证码" style = {{width: "40%"}} onChange = {e => {
                           this.handleIptChange({type: "newl_pass", value: e.target.value})
                       }}/>
                       <span className = "btn btn_primary f_rt">获取验证码</span>
                   </li>
                   <li>
                       <label>登录密码:</label>
                       <input type="password" placeholder = "请设置登录密码" onChange = {e => {
                           this.handleIptChange({type: "renewl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>确认登录密码:</label>
                       <input type="password" placeholder = "请确认登录密码" onChange = {e => {
                           this.handleIptChange({type: "renewl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <span className = "btn btn_primary" style = {{width : "95%", marginTop: ".5rem"}} onClick = {e => {
                            this.handleSubmit({type: "1"})
                        }}>注册</span>
                   </li>
                </ul>
                <p className = "text-center" style = {{marginTop: "2rem"}}>已有账号？直接<Link to = "/">登录</Link></p>
           </div>
        </div>
    }
}
            
export default Register;