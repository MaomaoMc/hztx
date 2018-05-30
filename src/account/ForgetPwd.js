import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ForgetPwd extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: "",
            code: "",
            pass: "",
            repass: "",
            warningShow: false,
            warningText: "",
            data_code: ""
        }
    }
    handleIptChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    hanleWarningDlgTimer (){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningShow: false
                })
            }
        , 1000)
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
    handleSubmit (e){  //完成 提交
        const type = this.props.match.params.type;
       const state = this.state;
       const self = this;
       const paramsStr = type === "tradePwd" ? "forgottPass" : "forgotPass"
       axios.post(window.baseUrl + "/home/Login/" + paramsStr + "?token=" + localStorage.getItem("token"), qs.stringify({
           phone: state.phone,
           code: state.code,
           pass: state.pass,
           repass: state.repass
       })).then(function(res){
          const data = res.data;
          const data_code = data.code;
          self.setState({
              warningShow: true,
              warningText: data.msg,
              data_code: data_code
          }, function(){
              self.hanleWarningDlgTimer();
          })
       })
    }
    render(){
        const type = this.props.match.params.type;
        const countDown = this.state.countDown;
        return <div> 
            <Title title = {type === "tradePwd" ? "忘记交易密码" : "忘记登录密码"} code = {this.state.data_code}/>
            <div className = "pb_100" style = {{marginTop: "1rem"}}>
               <ul className = "f_flex forgetPwdrUl" style = {{padding: ".3rem"}}>
                    <li>
                       <label>手机号:</label>
                       <input type="text" placeholder = "请输入手机号" value = {this.state.phone} onChange = {e => {
                           this.handleIptChange({type: "phone", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>验证码:</label>
                       <input type="text" placeholder = "请输入收到的验证码" style = {{width: "45%"}} value = {this.state.code} onChange = {e => {
                           this.handleIptChange({type: "code", value: e.target.value})
                       }}/>
                       <span className={countDown > 0 && countDown < 60 ? "btn btn_default f_rt" : "btn btn_primary f_rt"} onClick = {e => {
                         this.sendCode()
                    }}>{countDown > 0 && countDown < 60 ? countDown + "s后重试" : countDown === 0 ? "重新发送" : "验证码"}</span>
                   </li>
                   <li>
                       <label>设置新密码:</label>
                       <input type="password" placeholder = "请设置新密码" value = {this.state.pass} onChange = {e => {
                           this.handleIptChange({type: "pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>确认新密码:</label>
                       <input type="password" placeholder = "请确认新密码" value = {this.state.repass} onChange = {e => {
                           this.handleIptChange({type: "repass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                    <span className = "btn btn_primary" style = {{width: "94%", marginTop: ".3rem"}} onClick = {e => {
                        this.handleSubmit()
                    }}>完成</span>
                   </li>
               </ul>
               
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null }
            <Footer />
        </div>
    }
}

export default ForgetPwd;