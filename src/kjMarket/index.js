import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";
import TpwdDlg from "./../TpwdDlg";

class KjMarket extends Component {
    constructor (props){
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            data: [],
            warningShow: false,
            warningText: "",
            id: "",
            tpassDlgShow: false,
            pwdDlgConfirmFun: {}, //支付密码 ”确认“的事件 函数
            pwdDlgCancelFun: {} //支付密码 ”取消“的事件 函数
        }
    }
    pwdDlgCancelFun (){
        this.setState({
            tpassDlgShow: false
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
                        window.location.reload();
                    }
                })
            }
        , 1000)
    }
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Mill/millShop", qs.stringify({
            token: self.state.token
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data
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
    hanldBuyMill (e){  //兑换 即 购买矿机
        this.setState({
            tpassDlgShow: true,
            id: e.id,
            pwdDlgConfirmFun: this.buyMillSubmit.bind(this)
        })
    }
    buyMillSubmit (e){ //兑换 即 购买矿机  提交事件
        const self = this;
        axios.post(window.baseUrl + "/home/Mill/buyMill", qs.stringify({
            token: localStorage.getItem("token"),
            id: self.state.id,
            t_pass: e.t_pass
        })).then(function (res) {
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
    componentDidMount(){
        this.ajax()
    }
    render(){
        const data = this.state.data;
        const self = this;
        return <div> 
            <Title title = "矿机商城" code = {this.state.code} />
            <div className = "pb_100">
                <ul className = "kjLists f_flex">
                    {
                        data.length > 0 && data.map(function(item, i){
                            return <li key = {i}>
                                <img src = {window.baseUrl + item.pic} alt="" style = {{flexGrow: "0"}}/>
                                <div style = {{flexGrow: "2"}}>
                                    <h4>{item.name}</h4>
                                    <p><span></span>租金价格{item.price}JD</p>
                                    <p><span></span>最终产量{item.earning}JD</p>
                                    <span className = "total">共计{item.num}台</span>
                                </div>
                                <div style = {{flexGrow: "1"}}>
                                    <p>产力{item.force}</p>
                                    <span className = "btn" onClick = {e => {
                                        self.hanldBuyMill({id: item.id})
                                    }}>兑换</span>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <Footer />
            {this.state.warningShow ?  <WarningDlg text = {this.state.warningText} /> : null}
            {this.state.tpassDlgShow ? <TpwdDlg confirmFun = {this.state.pwdDlgConfirmFun} canCelFun = {
               this.pwdDlgCancelFun.bind(this)
            }/> : null}
        </div>
    }
}

export default KjMarket;