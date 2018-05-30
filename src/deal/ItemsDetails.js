import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ItemsDetails extends Component {
    constructor (props){
        super(props);
        const hash = window.location.hash;
        let page_type = "buyPay";
        if(hash.indexOf("buyPay") !== -1){ //买家打款页面
            page_type = "buyPay";
        }
        if(hash.indexOf("sellGet") !== -1){ //卖家收款页面
            page_type = "sellGet";
        }
        this.state = {
            page_type : page_type,
            data: {},
            trade_id: this.props.match.params.id,
            hash: hash,
            pic: "", //打款凭证
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
    handleUploadPic (e){  //上传图片
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
                console.log(window.baseUrl + data.pic,'2')
                self.setState({
                    pic: window.baseUrl + data.data
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer();
                })
             }
        })
    }
    handlePayMoney (){ //确认打款
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/remitMoney", qs.stringify({
            token: localStorage.getItem("token"),
            trade_id: self.state.trade_id,
            pic: self.state.pic
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
    handleGetMoney (){ //确认收款
        const self = this;
        axios.post(window.baseUrl + "/home/Trade/shouMoney", qs.stringify({
            token: localStorage.getItem("token"),
            trade_id: self.state.trade_id
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
        const page_type = this.state.page_type;
        console.log(self.state.trade_id)
        let paramStr = page_type === "buyPay" ? "/home/Trade/remitMoneyshow" : "/home/Trade/my_selltradeshow";
        axios.post(window.baseUrl + paramStr, qs.stringify({
            token: localStorage.getItem("token"),
            trade_id: self.state.trade_id
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        const page_type = this.state.page_type;
        let title = page_type === "buyPay" ? "打款页面" : "收款页面";
        return <div> 
            <Title title = {title} code = {this.state.code}/>
            <div className = "pb_100" style = {{backgroundColor: "white", paddingTop: ".2rem", paddingLeft: ".3rem", paddingRight: ".3rem"}}>
                {data.hasOwnProperty("trade") ? <div>
                    单号：{data.trade.trade_num}&nbsp;&nbsp;&nbsp;单价：{data.trade.price}
                    <p>数量：{data.trade.num}&nbsp;&nbsp;&nbsp;总价：{data.trade.zongprice}</p>
                </div> : null}
                { page_type === "buyPay" ? <div style = {{lineHeight: ".6rem", marginTop: ".3rem"}}>  {/*卖家信息 上传打款凭证 确认付款*/}
                    {data.hasOwnProperty("sell_member") ? <div>
                        <h3>卖家信息：</h3>
                        <p>ID：{data.sell_member.id_num}</p>
                        <p>账号：{data.sell_member.name}</p>
                        <p>手机号：{data.sell_member.phone}</p>
                        <p>微信：{data.sell_member.wx_num}</p>
                        <p>支付宝：{data.sell_member.zfb_num}</p>
                        <form action="" id="form" style = {{display: "inline"}}> 
                            <span className = "upload_wrap">
                            <span className = "btn btn_primary upload">上传打款凭证</span>
                                <input type="file" name="photo" id="photo" style = {{width: "1.55rem"}}
                                        onChange = {e => {this.handleUploadPic({value: e.target.value, obj: e.target})}}
                                        />   
                            </span>
                        </form>
                        <p className = "text-center"><img src = {this.state.pic} alt="" style = {{width: "2rem", height: "2rem"}} /></p>
                        <p className = "text-center"><span className = "btn btn_primary" style = {{width: "80%", marginTop: ".3rem"}} onClick = {e => {
                            this.handlePayMoney()
                        }}>确认打款</span></p>   
                    </div> : null }       
                </div> 
                :
                <div style = {{lineHeight: ".6rem", marginTop: ".3rem"}}>  {/*买家信息 查看买家打款凭证 确认收款*/}
                    {data.hasOwnProperty("buy_member") ? <div>
                        <h3>买家信息：</h3>
                        <p>ID：{data.buy_member.id_num}</p>
                        <p>账号：{data.buy_member.name}</p>
                        <p>手机号：{data.buy_member.phone}</p>
                        <h3>买家上传的打款凭证：</h3>
                        <p className = "text-center" style = {{marginTop: ".3rem"}}><img src={data.trade.pic} alt="" style = {{width: "1rem", height: "1rem", verticalAlign: "middle", marginRight: ".15rem"}}/></p>
                        <p className = "text-center"><span className = "btn btn_primary" style = {{width: "80%", marginTop: ".3rem"}} onClick = {e => {
                            this.handleGetMoney()
                        }}>确认收款</span></p>
                    </div> : null}
                </div>}
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default ItemsDetails;