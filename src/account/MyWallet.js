import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class MyWallet extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {
                "jd_num": "0", //金豆
                "money": "0", //现金
                "dmoney": "0",  //冻结金豆
                "bank_user": "",
                "bank_name": "",
                "id_num": "",
                "wx_num": "",
                "zfb_num": "",
            } , //个人信息数据
            name: "",
            num: "",
            type: "1",
            money: "10",
            note: "",
            form_show: false,
            opt_type: "tx",
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
    handleOpt (e) {//提现
        this.setState({
            form_show: true,
            opt_type: e.type
        })
    }
    handleSubmit (){ //提现 充值
        const self = this;
        const state = this.state;
        const opt_type = state.opt_type;
        const type　= this.state.type;
        const data= this.state.data;
        const paramsStr = opt_type === "tx" ? "/home/Member/withDraw" : "/home/Member/topUp";
        axios.post(window.baseUrl + paramsStr, qs.stringify({
            token: localStorage.getItem("token"),
            name: type === "3" ? data.bank_user : data.id_num,
            num: type === "3" ? data.bank_num : type === "1" ? data.wx_num : data.zfb_num,
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
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/member", qs.stringify({
            token: localStorage.getItem("token"),
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data[0]
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
    componentDidMount (){
        this.ajax();
    }
    render(){
        const opt_type = this.state.opt_type;
        const data = this.state.data;
        const type　= this.state.type;
        console.log(opt_type, 'opt_type')
        return <div className = "pb_100"> 
            <Title title = "我的钱包" code = {this.state.code}/>
            <div className = "pb_100" style = {{padding: ".2rem .2rem 2rem"}}>
                <p>现金：{(data.money * 1).toFixed(2)}元 <span style = {{marginLeft: ".3rem"}}>冻结金额：{(data.dmoney * 1).toFixed(2)}</span></p>
                <p style = {{marginTop: ".3rem"}}>金豆：{data.jd_num} <span style = {{marginLeft: ".3rem"}}>冻结金豆：{(data.djd_num * 1).toFixed(2)}</span></p>
                <p style = {{overflow: "hidden", marginTop: ".3rem"}}>
                    <span className = "btn btn_primary f_lt" style = {{width : "40%"}} onClick = {e => {
                        this.handleOpt({type: "tx"})
                    }}>提现</span>
                    <span className = "btn btn_primary f_rt" style = {{width : "40%"}} onClick = {e => {
                        this.handleOpt({type: "cz"})
                    }}>充值</span>
                </p>
                <p className = "text-center fc_red" style = {{fontSize: ".12rem", marginTop: ".01rem"}}>注！提现需扣除一定的手续费(和金豆交易时按手续费比例计算的手续费)</p>
                {this.state.form_show ? <ul className = "f_flex forgetPwdrUl" style = {{padding: ".3rem"}}>
                    <li>
                      {opt_type === "tx" ? <label>提现类型:</label> : <label>充值类型:</label> }
                       <select style = {{width: "40%", border: ".01rem solid #ddd", height: ".6rem", lineHeight: ".6rem"}} onChange = {e => {
                           this.handleIptChange({type: "type", value: e.target.value})
                       }}>
                           <option value="1">微信</option>
                           <option value="2">支付宝</option>
                           <option value="3">银行卡</option>
                       </select>
                   </li>
                   <li>
                      {opt_type === "tx" ? <label>提现名称:</label> : <label>充值名称:</label>}
                       {type === "3" ? <span>{data.bank_user}</span> : <span>{data.id_num}</span>}
                       {/* <input type="text" placeholder = {opt_type === "tx" ? "请输入提现账号名称" : "请输入充值账号名称"} value = {this.state.name} onChange = {e => {
                           this.handleIptChange({type: "name", value: e.target.value})
                       }}/> */}
                   </li>
                   <li>
                       {opt_type === "tx" ? <label>提现账号:</label> : <label>充值账号:</label>}
                       {type === "3" ? <span>{data.bank_num}</span> : type === "1" ? 
                        <span>{data.wx_num}</span> : <span>{data.zfb_num}</span>}
                       {/* <input type="text" placeholder = {opt_type === "tx" ? "请输入提现账号" : "请输入充值账号"} value = {this.state.num} onChange = {e => {
                           this.handleIptChange({type: "num", value: e.target.value})
                       }}/> */}
                   </li>
                   
                   <li>
                    {opt_type === "tx" ? <label>提现金额:</label> : <label>充值金额:</label>}
                       <select style = {{width: "40%", border: ".01rem solid #ddd", height: ".6rem", lineHeight: ".6rem"}} value = {this.state.money} onChange = {e => {
                           this.handleIptChange({type: "money", value: e.target.value})
                       }}>
                            <option value = "10">10</option>
                            <option value = "30">30</option>
                            <option value = "50">50</option>
                            <option value = "100">100</option>
                            <option value = "200">200</option>
                            <option value = "500">500</option>
                            <option value = "1000">1000</option>
                       </select>
                       {/* <input type="text" placeholder = {opt_type === "tx" ? "请输入提现金额" : "请输入充值金额"} /> */}
                   </li>
                   <li style = {{height: "3rem"}}>
                       <label>备注:</label>
                        <textarea className = "f_rt" style = {{textIndent: ".1rem", border: "none", width: "70%", height: "3rem"}}
                        placeholder = "备注"
                         onChange = {e => {
                           this.handleIptChange({type: "note", value: e.target.value})
                       }}></textarea>
                   </li>
                   <li className = "over_hidden" style = {{marginTop: ".3rem"}}>
                       <span className = "btn btn_primary f_lt" style = {{width : "95%"}} onClick = {e => {
                            this.handleSubmit()
                        }}>提交</span>
                   </li>
                   <li>
                    <p className = "text-center fc_red" style = {{fontSize: ".12rem"}}>可提现/充值时间段：9:00-17:00</p>
                   </li>
                </ul> : null }
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default MyWallet;