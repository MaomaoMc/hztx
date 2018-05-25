import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class GatherHall extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],
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
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/deliveryList", qs.stringify({
            token: localStorage.getItem("token"),
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
                    self.hanleWarningDlgTimer();
                })
            }
        })
    }
    componentDidMount(){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        const page_type = this.state.page_type
        return <div> 
            <Title title = "收割大厅" code = {this.state.code}/>
            <div className = "pb_100">
                <ul className = "f_flex dealLists">
                    {
                        data.length === 0 ? <li>暂无数据可显示</li> :
                        data.length > 0 && data.map(function(item, i){
                            const status = item.status;
                            const trade_id= item.trade_id;
                            return <li key = {i}>
                                <p className = "fc_blue" style = {{overflow: "hidden"}}>
                                    <span className = "f_lt">单号：{item.trade_num}</span>
                                    {page_type === "buylist" && status === "付款" ? <Link to = {"/deal/itemsDetails/" + trade_id + "/buyPay"}><span className = "f_rt btn btn_orange">{status}</span></Link> :
                                        page_type === "selllist" && status === "已付款" ? <Link to = {"/deal/itemsDetails/" + trade_id + "/sellGet"}><span className = "f_rt btn btn_orange">{status}</span></Link> :
                                        <span className = "f_rt">{status}</span>}
                                </p>
                                <p>卖家ID：{item.sell_id}&nbsp;&nbsp;买家ID：{item.buy_id}</p>
                                <p>挂卖{item.num}BTA，单价{item.price}元，总价{item.num * item.price}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default GatherHall;