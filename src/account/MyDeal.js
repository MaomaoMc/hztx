import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const dealNav = [
    {
        text: "我的买单"
    },
    {
        text: "我的卖单"
    }
];
class MyDeal extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],
            tabIndex: 0,
            warningShow: false,
            warningText: "",
            code: ""
        }
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
    dealNavClick (e){
        const index = e.index;
        this.setState({
            tabIndex: index,
        }, function(){
            this.ajax()
        })
    }
    ajax (){
        const self = this;
        const tabIndex = this.state.tabIndex;
        let paramStr = "";
        if(tabIndex === 0){
            paramStr = "my_buytradeList"
        }
        if(tabIndex === 1){
            paramStr = "my_selltradeList"
        }
        axios.post(window.baseUrl + "/home/Trade/" + paramStr, qs.stringify({
            token: localStorage.getItem("token"),
            type: self.state.type
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
                    data: [],
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer();
                })
            }
        })
    }
    renderStatus (status){
        let text = "";
        if(status === 1){
            text = "等待中";
        }
        if(status === 2){
            text = "交易中";
        }
        if(status === 3){
            text = "已打款";
        }
        if(status === 4){
            text = "已完成";
        }
        if(status === 5){
            text = "已取消";
        }
        return text;
    }
    componentDidMount(){
        this.ajax();
    }
    render(){
        const self = this;
        const data = this.state.data;
        const tabIndex = this.state.tabIndex;
        return <div> 
            <Title title = "我的交易" code = {this.state.code}/>
            <div className = "pb_100">
                <ul className = "dealNav f_flex" style = {{marginTop: ".3rem"}}>
                    {
                        dealNav.map(function(item, i){
                            return <li key = {i} className = {self.state.tabIndex === i ? "active" : ""}
                            onClick = {e => {
                                self.dealNavClick({index: i})
                            }}>
                                <a>{item.text}</a>
                            </li>
                        })
                    }
                </ul>
                <ul className = "f_flex dealLists">
                    {
                        data.length === 0 ? <li>暂无数据可显示</li> :
                        data.length > 0 && data.map(function(item, i){
                            return <li key = {i}>
                                <p className = "fc_blue" style = {{overflow: "hidden"}}>
                                    <span className = "f_lt">单号：{item.trade_num}</span>
                                    <span className = "f_rt">{self.renderStatus(item.status)}</span>
                                </p>
                                <p>{tabIndex === 0 ? "卖家ID：" + item.sell_id : "买家ID：" + item.buy_id}</p>
                                <p>挂卖{item.num}BTA，单价{item.price}元，总价{item.num * item.price}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
            <Footer />
        </div>
    }
}

export default MyDeal;