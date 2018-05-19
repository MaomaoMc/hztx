import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ReCharge extends Component {
    constructor (props){
        super(props);
        this.state = {
            name: "",
            num: "",
            type: "1",
            money: "",
            note: "",
            warningShow: false,
            warningText: "",
            code: ""
        }
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
    handleIptChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    handleSubmit (){ //充值
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Member/topUp", qs.stringify({
            token: localStorage.getItem("token"),
            name: state.name,
            num: state.num,
            type: state.type,
            money: state.money,
            note: state.note,
        })).then(function(res){
            const data = res.data;
            const code = data.code;
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
        return <div className = "pb_100"> 
            <Title title = "充值" code = {this.state.code}/>
            <div className = "pb_100" style = {{padding: ".2rem .2rem 2rem"}}>
            <ul className = "f_flex registerUl" style = {{padding: ".3rem"}}>
                   <li>
                       <label>名称:</label>
                       <input type="text" placeholder = "请输入充值账号名称" value = {this.state.name} onChange = {e => {
                           this.handleIptChange({type: "name", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>充值账号:</label>
                       <input type="text" placeholder = "请输入充值账号" value = {this.state.num} onChange = {e => {
                           this.handleIptChange({type: "num", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>充值类型:</label>
                       <select style = {{width: "40%", border: ".01rem solid #ddd", height: ".6rem", lineHeight: ".6rem"}} onChange = {e => {
                           this.handleIptChange({type: "type", value: e.target.value})
                       }}>
                           <option value="1">微信</option>
                           <option value="2">支付宝</option>
                           <option value="3">银行卡</option>
                       </select>
                   </li>
                   <li>
                       <label>充值金额:</label>
                       <input type="text" placeholder = "请输入充值金额" value = {this.state.money} onChange = {e => {
                           this.handleIptChange({type: "money", value: e.target.value})
                       }}/>
                   </li>
                   <li style = {{height: "3rem"}}>
                       <label>备注:</label>
                        <textarea className = "f_rt" style = {{textIndent: ".1rem", border: "none", width: "70%", height: "3rem"}}
                        placeholder = "备注"
                         onChange = {e => {
                           this.handleIptChange({type: "note", value: e.target.value})
                       }}></textarea>
                   </li>
                   <li>
                       <span className = "btn btn_primary" style = {{width : "95%", marginTop: ".5rem"}} onClick = {e => {
                            this.handleSubmit()
                        }}>充值</span>
                        <p className = "text-center fc_red" style = {{fontSize: ".12rem"}}>可充值时间段：9:00-17:00</p>
                   </li>
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default ReCharge;