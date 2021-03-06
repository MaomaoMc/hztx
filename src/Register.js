// 
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./Title";
import WarningDlg from "./WarningDlg";

const loginImg = require("./img/logo.png");
const bg = require("./img/bg.png");
class Register extends Component {
    constructor(props){
        super(props);
        let tui_id = "";
        const hash = window.location.hash;
        if(hash.indexOf("tui_id") !== -1){
            tui_id = hash.substring(hash.indexOf("tui_id") + 7);
        }
        this.state = {
            phone: "",
            code: "",
            l_pass: "",
            rl_pass: "",
            tui_id: tui_id,
            countDown: 60,
            warningShow: false,
            warningText: "",
            data_code: "",
            registered: false
        }
    }
    hanleWarningDlgTimer(obj) {
        const self = this;
        setTimeout(
            function () {
                self.setState({
                    warningShow: false
                }, function(){
                    if(obj && obj.code === 1){  //注册成功回到登录页面
                        window.removeLocalItemsFun();
                        self.setState({
                            registered: true
                        })
                    }
                })
            }
            , 1000)
    }
    handleIptChange(e){
        this.setState({
            [e.type]: e.value
        })
    }
    checkMobile (phone){ //手机号码验证
        if(!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone))){ 
         return false; 
        } else{
          return true;
        }
      }
      resendCode (){  //60s倒计时 重新发送验证码
        let countDown = this.state.countDown;
        let timer;
        const self = this;
        if(countDown !== 0){  //倒计时没结束
             timer = setInterval(
                function () {
                    countDown--;
                    if(countDown === 0){
                        clearInterval(timer);
                    }
                    self.setState({
                        countDown: countDown
                    })
                }
            , 1000)
        }
    }
    passValidate (e){
        const value = e.value;
        const page_type = this.state.page_type;
        if(page_type === 2){ //交易密码
            if(value.length < 6){
                this.setState({
                    warningShow: true,
                    warningText: "交易密码不能小于6位"
                }, function(){
                    this.hanleWarningDlgTimer()
                })
                return;
            } 
        }
        
        if(!(/^[A-Za-z0-9]+$/.test(value))){  //密码只能是6位数 的字母加数字
            this.setState({
                warningShow: true,
                warningText: "密码只能是字母或数字组成"
            }, function(){
                this.hanleWarningDlgTimer()
            })
            return;
        }
    }
    sendCode (){  //获取验证码
        const self = this;
        const phone = this.state.phone;
        const countDown = this.state.countDown;
        console.log(countDown, countDown < 60 && countDown > 0, '23')
        if(countDown < 60 && countDown > 0){  //正在倒计时就不要再让点击了
            return;
        }
        if(!this.checkMobile(phone)){
            this.setState({
                warningShow: true,
                warningText: "请输入正确的手机号码",
            }, function(){
                self.hanleWarningDlgTimer()
            });
            return;
          }
        axios.post(window.baseUrl + "/home/Login/send", qs.stringify({
            phone: phone
        })).then(function(res){
            const data = res.data;
            const data_code = data.code;
            if(data_code === 1){  //发送成功 开始倒计时
                self.setState({
                    countDown: 60
                }, function(){
                    self.resendCode();
                })
            }
           self.setState({
               warningShow: true,
               warningText: data.msg,
             data_code: data_code
           }, function(){
               self.hanleWarningDlgTimer()
           })
        })
    }
    handleSubmit (){  //注册
        if(this.state.registered){  //防止二次点击
            return;
        }
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Login/register", qs.stringify({
            phone: state.phone,
            code: state.code,
            l_pass: state.l_pass,
            rl_pass: state.rl_pass,
            tui_id: state.tui_id
        })).then(function(res){
            const data = res.data;
            const data_code = data.code;
            self.setState({
                warningShow: true, 
                warningText: data.msg,
                data_code: data_code
            }, function(){
                self.hanleWarningDlgTimer({code: data_code})
            })
        })
    }
    render(){
        const countDown = this.state.countDown;
        if(this.state.registered){
            return <Redirect to = "/"/>
        }
        return <div style = {{width: "100%", height: "100%",
        backgroundImage: "url(" + bg + ")", backgroundSize: "cover", marginTop: "-1rem"}}> 
           <div style = {{ padding: "0 .3rem 1rem", marginBottom: "1rem"}}>
           <img src={loginImg} alt="" style={{width: "75%", marginLeft: "14%", marginTop: "2rem", marginBottom: ".5rem"}}/>
                <ul className = "f_flex registerUl" style = {{padding: ".3rem 0 .5rem"}}>
                   <li>
                       <input type="text" placeholder = "手机号：" value = {this.state.phone} onChange = {e => {
                           this.handleIptChange({type: "phone", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <input type="text" placeholder = "验证码：" style = {{width: "70%"}} value = {this.state.code} onChange = {e => {
                           this.handleIptChange({type: "code", value: e.target.value})
                       }}/>
                       <span className={countDown > 0 && countDown < 60 ? "btn btn_default f_rt" : "btn btn_primary f_rt"} onClick = {e => {
                        this.sendCode()
                    }}>{countDown > 0 && countDown < 60 ? countDown + "s后重试" : countDown === 0 ? "重新发送" : "获取验证码"}</span>
                   </li>
                   <li>
                       <input type="password" placeholder = "创建密码：" value = {this.state.l_pass} onChange = {e => {
                           this.handleIptChange({type: "l_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <input type="password" placeholder = "重复确认密码：" value = {this.state.rl_pass} onChange = {e => {
                           this.handleIptChange({type: "rl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       {window.location.hash.indexOf("tui_id") !== -1 ? <input type="text" placeholder="推荐人手机号或ID：" disabled = "true" readOnly="true" defaultValue= {this.state.tui_id} />
                        : <input type="text" placeholder="推荐人ID：" value = {this.state.tui_id} onChange = {e => {
                            this.handleIptChange({type: "tui_id", value: e.target.value})
                        }}/>}
                   </li>
                   <li>
                       <span className = "btn btn_primary" style = {{width : "95%", marginTop: ".5rem"}} onClick = {e => {
                            this.handleSubmit()
                        }}>注册</span>
                   </li>
                </ul>
                <p className = "text-center" style = {{fontSize: ".24rem", color: "white", marginTop: "1rem"}}>已有账号？直接<Link to = "/" style = {{color: "#00a8ff"}}>登录</Link></p>
           </div>
           {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
        </div>
    }
}
            
export default Register;