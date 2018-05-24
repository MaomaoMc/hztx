import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const defaultHeadPic = require("../img/pic_morentx.png");
class PersonalItems extends Component {
    constructor(props){
        super(props);
        const head_pic = localStorage.getItem("head_pic");
        this.state = {
            profile_pic: head_pic === "null" ? defaultHeadPic : head_pic ,//头像
            editing: false,  //是否编辑了
            username: "",
            phone: "",
            y_code: "",  //验证码
            card_num: "",
            zfb_num: "",
            wx_num: "",
            bank_name: "",
            bank_num: "",
            t_pass: "",
            t_repass: "",
            countDown: 60,
            warningShow: false,
            warningText: "",
            code: ""
        }
    }

    uploadedFile (e){ //修改头像
        const self = this;
        let file = document.getElementById("photo").files[0];
        let formData = new FormData()  // 创建form对象
        formData.append('pic', file)  // 通过append向form对象添加数据
        axios.post(window.baseUrl +  "/home/Base/uploadPic?token=" + localStorage.getItem("token"), formData, {
            transformRequest: [(data) => data],
            headers: {}
        }).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){ //成功
                const pic = window.baseUrl +  data.data;
                self.setState({
                    profile_pic: pic
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
             }
            self.setState({
                code: code
            })
        })
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
                        localStorage.setItem("head_pic", self.state.profile_pic);
                        window.history.back();
                    }
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
    submit (){  //提交
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Member/realName", qs.stringify({
            token: localStorage.getItem("token"),
            username: state.username,
            phone: state.phone,
            card_num: state.card_num,
            zfb_num: state.zfb_num,
            wx_num: state.wx_num,
            bank_name: state.bank_name,
            bank_num: state.bank_num,
            pic: state.profile_pic , //头像
            t_pass: state.t_pass,
            t_repass: state.t_repass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            self.setState({
                warningShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code});
            })
        })
    }
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/member", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                const obj = data.data[0];
                self.setState({
                    profile_pic: window.baseUrl + obj.pic,
                    username: obj.username,
                    phone: obj.phone,
                    card_num: obj.card_num,
                    zfb_num: obj.zfb_num,
                    wx_num: obj.wx_num,
                    bank_name: obj.bank_name,
                    bank_num: obj.bank_num,
                })
            }else{
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const editing = this.state.editing;
        const state = this.state;
        const countDown = state.countDown;
        const profile_pic = state.profile_pic;
        return <div> 
            <Title title = "个人资料" code = {this.state.code} />
            <div className = "pb_100">
                <div className="file"  >
                    <form action="" id="form"> 
                        <input type="file" name="photo" id="photo"
                            onChange = {e => {this.uploadedFile({value: e.target.value, obj: e.target})}}
                            />
                            <img src={profile_pic} alt=""/>
                    </form>
                </div>  
                <p className = "text-center" style = {{fontSize: ".12rem", color: "#999", marginTop: ".1rem"}}>点击可修改头像</p>
                <ul className = "f_flex personalUl">
                    <li>
                        <label>昵称：</label>
                        <input type="tel" placeholder = "请输入昵称" disabled = {!editing ? true : false} value = {state.username} onChange = {e => {
                            this.handleIptChange({type: "username", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>手机号码：</label> 
                        <input type="tel" placeholder = "请输入手机号" disabled = {!editing ? true : false} value = {state.phone} onChange = {e => {
                            this.handleIptChange({type: "phone", value: e.target.value})
                        }}/>
                    </li>
                    {editing ? <li>
                        <label>验证码：</label>
                        <input type="text" placeholder = "请输入验证码" onChange = {e => {
                            this.handleIptChange({type: "y_code", value: e.target.value})
                        }}/>
                        <span className={countDown > 0 && countDown < 60 ? "btn btn_default f_rt" : "btn btn_primary f_rt"} onClick = {e => {
                            this.sendCode()
                        }}>{countDown > 0 && countDown < 60 ? countDown + "s后重试" : countDown === 0 ? "重新发送" : "获取验证码"}</span>
                    </li> : null}
                    <li>
                        <label>姓名：</label>
                        <input type="tel" placeholder = "请输入姓名" disabled = {!editing ? true : false} value = {state.name} onChange = {e => {
                            this.handleIptChange({type: "name", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>身份证号码：</label>
                        <input type="tel" placeholder = "请输入身份证号码" disabled = {!editing ? true : false} value = {state.card_num} onChange = {e => {
                            this.handleIptChange({type: "card_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>银行名称：</label>
                        <input type="tel" placeholder = "请输入银行名称" disabled = {!editing ? true : false} value = {state.bank_name} onChange = {e => {
                            this.handleIptChange({type: "bank_name", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>银行卡号：</label>
                        <input type="tel" placeholder = "请输入银行卡号" disabled = {!editing ? true : false} value = {state.bank_num} onChange = {e => {
                            this.handleIptChange({type: "bank_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>支付宝：</label>
                        <input type="tel" placeholder = "请输入支付宝账号" disabled = {!editing ? true : false} value = {state.zfb_num} onChange = {e => {
                            this.handleIptChange({type: "zfb_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>微信号：</label>
                        <input type="tel" placeholder = "请输入微信账号" disabled = {!editing ? true : false} value = {state.wx_num} onChange = {e => {
                            this.handleIptChange({type: "wx_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>交易密码：</label>
                        <input type="password" placeholder = "请设置交易密码" disabled = {!editing ? true : false} value = {state.t_pass} onChange = {e => {
                            this.handleIptChange({type: "t_pass", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>确认交易密码：</label>
                        <input type="password" placeholder = "请确认交易密码" disabled = {!editing ? true : false} value = {state.t_repass} onChange = {e => {
                            this.handleIptChange({type: "t_repass", value: e.target.value})
                        }}/>
                        <Link to = "/account/pwdControl"><span className = "btn btn_primary f_rt">更换密码</span></Link>
                    </li>
                    {!editing ? <li style = {{height: "1rem"}}>
                        <span className = "btn btn_primary submit" style = {{width: "95%"}} onClick = {e => {
                            this.setState({
                                editing: true
                            })
                        }}>编辑</span> </li>
                        : <li><span className = "btn btn_primary submit" style = {{width: "95%"}} onClick = {e => {
                            this.submit()
                        }}>完成</span><span className = "btn btn_default submit text-center" style = {{width: "95%", marginTop: ".2rem"}} onClick = {e => {
                            this.setState({
                                editing: false
                            })
                    }}>取消编辑</span></li>}
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default PersonalItems;