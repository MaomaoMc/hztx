import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import WarningDlg from "./../WarningDlg";

const loginImg = require("../img/logo.jpg");
class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            phone: "18796271508",
            l_pass: "123",
            logined: false,
            warningShow: false,
            warningText: ""
        }
    }
    handleIptChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningShow: false
                }, function(){
                    if(obj && obj.code === 1){
                       
                        self.setState({
                            logined: true
                        })
                    }
                })
            }
        , 1000)
    }
    login (){
        const self = this;
        const phone = this.state.phone;
        const l_pass = this.state.l_pass;
        axios.post(window.baseUrl + "/home/Login/login", qs.stringify({
            phone: phone,
            l_pass: l_pass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                localStorage.setItem("token", data.data.token);
            }
            self.setState({
                warningShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code})
            })
        })
    }
    render(){
        if(this.state.logined){  //登录成功 跳转到主页
            return <Redirect to = "/main" />
        }
        return <div> 
            <img src={loginImg} alt="" style={{width: "36%", marginLeft: "32%", marginTop: ".5rem", marginBottom: ".5rem"}}/>
            <div>
                <form action="" id="loginFrom" className = "loginFrom" style = {{paddingBottom: ".3rem"}}>
                    <ul>
                        <li style = {{borderBottom: ".02rem solid #e5e5e5"}}>
                            <span><i></i></span>
                            <input type="text" className = "input-txt" placeholder = "请输入会员账号" value = {this.state.phone}
                            onChange = {e => {
                                this.handleIptChange({type: "phone", value: e.target.value})
                            }}/>
                        </li>
                        <li>
                            <span><i></i></span>
                            <input type="password" className = "input-txt" placeholder = "请输入登录密码" value = {this.state.l_pass}
                            onChange = {e => {
                                this.handleIptChange({type: "l_pass", value: e.target.value})
                            }}/>
                        </li>
                    </ul>
                    <div style = {{padding: '0 .3rem'}}>
                        <button className = "submit" onClick = {e => {
                            this.login()
                        }}>登录</button>
                        <p style = {{color: "#f04447", textAlign: "right"}}>忘记密码</p>
                        <p className = "text-center"><Link to = "/register">注册</Link></p>
                    </div>
                </form>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
        </div>
    }
}

export default Login;