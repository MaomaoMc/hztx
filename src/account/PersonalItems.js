import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class PersonalItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            phone: "",
            y_code: "",  //验证码
            card_num: "",
            zfb_num: "",
            wx_num: "",
            bank_name: "",
            bank_num: "",
            warningShow: false,
            warningText: "",
            code: ""
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
                        window.history.back();
                    }
                })
            }
        , 1000)
    }
    sendCode (){ //发送验证码

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
            bank_num: state.bank_num
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
        const username = this.state.username;
        const phone = this.state.phone;
        const card_num = this.state.card_num;
        const zfb_num = this.state.zfb_num;
        const wx_num = this.state.wx_num;
        const bank_name = this.state.bank_name;
        const bank_num = this.state.bank_num;
        return <div> 
            <Title title = "个人资料" code = {this.state.code} />
            <div className = "pb_100">
                <ul className = "f_flex personalUl">
                    <li>
                        <label>会员账号：</label>
                        <span>24563112323</span>
                    </li>
                    <li>
                        <label>会员等级：</label>
                        <span>BTA矿工</span>
                    </li>
                    <li>
                        <label>手机号码：</label> 
                        <input type="tel" placeholder = "请输入手机号" disabled = {!phone ? false : true} value = {phone} onChange = {e => {
                            this.hanleIptChange({type: "phone", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>验证码：</label>
                        <input type="text" placeholder = "请输入验证码" value = {this.state.y_code} onChange = {e => {
                            this.hanleIptChange({type: "y_code", value: e.target.value})
                        }}/>
                        <span className = "btn btn_primary f_rt" style = {{width: "26%"}} onClick = {e => {
                            this.sendCode()
                        }}>发送验证码</span>
                    </li>
                    <li>
                        <label>姓名：</label>
                        <input type="tel" placeholder = "请输入姓名"  disabled = {!username ? false : true} value = {username} onChange = {e => {
                            this.handleIptChange({type: "username", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>身份证号码：</label>
                        <input type="tel" placeholder = "请输入身份证号码"  disabled = {!card_num ? false : true} value = {card_num} onChange = {e => {
                            this.hanleIptChange({type: "card_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>银行名称：</label>
                        <input type="tel" placeholder = "请输入银行名称"  disabled = {!bank_name ? false : true} value = {bank_name} onChange = {e => {
                            this.hanleIptChange({type: "bank_name", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>银行卡号：</label>
                        <input type="tel" placeholder = "请输入银行卡号"  disabled = {!bank_num ? false : true} value = {bank_num} onChange = {e => {
                            this.hanleIptChange({type: "bank_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>支付宝：</label>
                        <input type="tel" placeholder = "请输入支付宝账号"  disabled = {!zfb_num ? false : true} value = {zfb_num} onChange = {e => {
                            this.hanleIptChange({type: "zfb_num", value: e.target.value})
                        }}/>
                    </li>
                    <li>
                        <label>微信号：</label>
                        <input type="tel" placeholder = "请输入微信账号"  disabled = {!wx_num ? false : true} value = {wx_num} onChange = {e => {
                            this.hanleIptChange({type: "wx_num", value: e.target.value})
                        }}/>
                    </li>
                    <li style = {{height: "1rem"}}>
                        <span className = "btn btn_primary submit" onClick = {e => {
                            this.submit()
                        }}>完成</span>
                        <p className = "text-center" style = {{fontSize: ".2rem"}}>温馨提示：交易账户绑定之后不可修改，请确认账户资料填写正确</p>
                    </li>
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default PersonalItems;