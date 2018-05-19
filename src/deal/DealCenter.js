import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import echarts from 'echarts';
import "./../css/deal.css";
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";
import TpwdDlg from "./../TpwdDlg";

class DealCenter extends Component {
    constructor (props){
        super(props);
        this.state = {
            tradeMsg_data: {"topPrice": "", "bottomPrice": "", "newPrice": ""},
            price_data: [],
            lists_data: [],
            price: "",
            num: "",
            trade_id: "",
            warningShow: false,
            warningText: "",
            code: "",
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
        axios.post(window.baseUrl + "/home/Trade/tradeList", qs.stringify({
            token: localStorage.getItem("token"),
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    lists_data: data.data
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
    handleIptChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    handleBuyJd (){  //发布买币
        this.setState({
            tpassDlgShow: true,
            pwdDlgConfirmFun: this.buyJdSubmit.bind(this)
        })
    }
    handleSellEvent (e){  //卖给他
        this.setState({
            trade_id: e.trade_id,
            tpassDlgShow: true,
            pwdDlgConfirmFun: this.sellEventSubmit.bind(this)
        })
    }
    buyJdSubmit(e){  //发布金币 请求
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/buyjd", qs.stringify({
            token: localStorage.getItem("token"),
            price: self.state.price,
            num: self.state.num,
            t_pass: e.t_pass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    tpassDlgShow: false
                })
            }
            self.setState({
                warningShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code});
            })
        })
    }
    sellEventSubmit(e){ //卖给他 请求
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/selljd", qs.stringify({
            token: localStorage.getItem("token"),
            trade_id: self.state.trade_id,
            t_pass: e.t_pass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    tpassDlgShow: false
                })
            }
            self.setState({
                warningShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code});
            })
        })
    }
    tradeMsgAjax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/tradeMsg", qs.stringify({
            token: localStorage.getItem("token"),
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){  //成功
                self.setState({
                    tradeMsg_data: data.data
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer()
                })
             }
        })
    }
    priceLineAjax (){ //价格线
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/priceLine", qs.stringify({
            token: localStorage.getItem("token"),
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){  //成功
                self.setState({
                    price_data: data.data
                }, function(){
                    this.chartLine()  //渲染图表
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer()
                })
             }
        })
    }
    formatLineDate (){
        const price_data = this.state.price_data;
        let time_arr = [] , data_arr = [];
        price_data.map(function(item, i){
            time_arr[i] = new Date(item.add_time * 1000).format("hh:mm");
            data_arr[i] = item.price;
        })
        return {
            time_arr: time_arr,
            data_arr: data_arr
        }
    }
    chartLine () {
        const data = this.formatLineDate();
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('chart'));
        // // 绘制图表
        myChart.setOption({
            title: {
                text: '价格走势图',
                left:'left',
                textStyle:{
                    //文字颜色
                    color:'#00a8ff',
                    //字体系列
                    //字体大小
            　　　　 fontSize: ".13rem",
                 
                }
            },
            // backgroundColor: "white",
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
           
            // toolbox: false,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                borderColor: "transprent"
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : data.time_arr,
                    axisLine:{
                        lineStyle:{
                            color:'#00a8ff',
                        }
                    } 
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine:{show: false},//去除网格线
                }
            ],
            series : [
                {
                    type:'line',
                    smooth: true,
                    itemStyle : {  
                        normal : {  
                            color: "#0a236a",
                            lineStyle:{  
                                color:'#03a6d6'  
                            }  
                        }  
                    },  
                    data: data.data_arr
                }
            ]
        });
    }
    componentDidMount (){
        this.ajax();
        this.tradeMsgAjax();
        this.priceLineAjax();
    }
    render(){
        const self = this;
        const lists_data = this.state.lists_data;
        const tradeMsg_data = this.state.tradeMsg_data;
        return <div> 
            <Title title = "交易中心" code = {this.state.code}/>
            <div className = "deal_head">
                <div>
                    <p>最高：{tradeMsg_data.topPrice}</p>
                    <p>最低：{tradeMsg_data.bottomPrice}</p>
                </div>
                <div>{tradeMsg_data.newPrice}</div>
            </div>
            <div id = "chart"></div>
            <div className = "dealWrap">
                <form>
                    <input type="text" placeholder = "请输入数量" value = {this.state.num} onChange = {e => {
                        this.handleIptChange({type: "num", value: e.target.value})
                    }}/>
                    <input type="text" placeholder = "请输入单价" value = {this.state.price} onChange = {e => {
                        this.handleIptChange({type: "price", value: e.target.value})
                    }}/>
                    <span className = "btn" onClick = {e => {
                        this.handleBuyJd()
                    }}>发布买币</span>
                </form>
                <ul className="dealLists f_flex">
                    {
                        lists_data.length > 0 && lists_data.map(function (item, i) {
                            const num = item.num;
                            const price = item.price;
                            return <li key={i} className="fz_22">
                                <p>
                                    <span className="fc_blue">单号：{item.trade_num}</span>
                                    <span className="f_rt">买家ID：{item.buy_id}</span>
                                </p>
                                <p className = "text_center" style={{lineHeight: ".5rem"}}>挂卖{num}MAC，单价{price}元，总价{Math.round(parseFloat(num * price)*100)/100}</p>
                                <p className="text-center" style = {{marginTop: ".2rem"}}>
                                    <span className="btn btn_primary" style = {{width: "2.5rem", height: ".6rem", lineHeight: ".6rem"}} onClick = { e => {
                                        self.handleSellEvent({trade_id: item.trade_id})
                                    }}>卖给他</span>
                                </p>
                            </li>
                        })
                    }
                </ul>
            </div>
            <Footer />
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            {this.state.tpassDlgShow ? <TpwdDlg confirmFun = {this.state.pwdDlgConfirmFun} canCelFun = {
               this.pwdDlgCancelFun.bind(this)
            }/> : null}
        </div>
    }
}

export default DealCenter;