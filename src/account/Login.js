import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import WarningDlg from "./../WarningDlg";

const loginImg = require("../img/logo.png");
const loginItemsImg = require("../img/logo_item.png");
const bg = require("../img/bg.png");
class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            phone: "",
            l_pass: "",
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
                })
            }
        , 1000)
    }
    login (){
        const self = this;
        const phone = this.state.phone;
        const l_pass = this.state.l_pass;
        console.log("SDa")
        axios.post(window.baseUrl + "/home/Login/login", qs.stringify({
            phone: phone,
            l_pass: l_pass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){  //登陆成功
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("head_pic", data.data.pic);
                self.setState({
                    logined: true
                })
            }
            else{
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer()
                })
            }
        })
    }
    render(){
        if(this.state.logined){  //登录成功 跳转到主页
            return <Redirect to = "/main" />
        }
        return <div style = {{width: "100%", height: "100%", position: "fixed", left: "0", top: "0",
        backgroundImage: "url(" + bg + ")", backgroundSize: "cover", overflow: "auto"}}> 
            <img src={loginImg} alt="" style={{width: "75%", marginLeft: "14%", marginTop: "2.5rem", marginBottom: ".5rem"}}/>
            <img src={loginItemsImg} alt="" style={{width: "65%", marginLeft: "17%", marginBottom: "1rem"}}/>
            <div>
                <form action="" id="loginFrom" className = "loginFrom" style = {{paddingBottom: ".3rem"}}>
                    <ul>
                        <li>
                            <input type="text" className = "input-txt" placeholder = "请输入会员账号" value = {this.state.phone}
                            onChange = {e => {
                                this.handleIptChange({type: "phone", value: e.target.value})
                            }}/>
                        </li>
                        <li>
                            <input type="password" className = "input-txt" placeholder = "请输入登录密码" value = {this.state.l_pass}
                            onChange = {e => {
                                this.handleIptChange({type: "l_pass", value: e.target.value})
                            }}/>
                        </li>
                    </ul>
                    <div>
                        <button className = "submit" onClick = {e => {
                            this.login()
                        }}>登录</button>
                        <p style = {{textAlign: "right"}}><Link to = "/forgetPwd/loginPwd" style = {{color: "#00a8ff"}}>忘记密码</Link></p>
                        {/* <p className = "text-center"><Link to = "/register">注册</Link></p> */}
                    </div>
                </form>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
        </div>
    }
}

export default Login;