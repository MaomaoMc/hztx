import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import QRCode from 'qrcode.react';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class JDtaskDetail extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {
                title: "",
                content: "",
                money: "",
                member_id: "",
                data: {},
            },
            pic_arr: [],
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
    handleAcceptTask (){  //接收任务
        const self = this;
        axios.post(window.baseUrl + "/home/Member/getTask", qs.stringify({
            token: localStorage.getItem("token"),
            task_id: this.props.match.params.id
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
        axios.post(window.baseUrl + "/home/Jdtask/jdtaskDetail", qs.stringify({
            token: localStorage.getItem("token"),
            id: this.props.match.params.id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                console.log(data.data.pic)
                self.setState({
                    data: data.data,
                    pic_arr: data.data.pic.split(",")
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
        const data = this.state.data;
        const hash = window.location.hash;
        console.log(data, '2')
        return <div> 
            <Title title = "任务详情" code = {this.state.code}/>
            <div className = "taskDetail">
                <h3 className = "text-center">{data.title}</h3>
                <div style = {{lineHeight: ".6rem", padding: ".2rem .3rem"}}>
                    <p><span className = "f_lt">任务ID：{data.id}</span>
                        <span className = "f_rt fc_red"><span className = "icon">赏</span>{data.jd}金豆</span>
                    </p><br/>
                    <p>任务发布时间：{new Date(data.add_time * 1000).format("yyyy-MM-dd hh:mm:ss")}</p>
                    <p style = {{wordWrap: "break-word"}}>任务内容：{data.content}</p>
                    <p>任务链接：{data.url}</p>
                    <p style = {{marginTop: ".2rem"}}><span style = {{verticalAlign: "top"}}>任务二维码：</span><QRCode value = {window.baseUrl + data.qr_code}/></p>
                    <h4>任务所需截图：</h4>
                    <p className = "text-center">
                        {
                            this.state.pic_arr.map(function(pic, i){
                                return <img key = {i} src = {pic} alt="" style = {{display: "block", width: "1.2rem", height: "1.2rem", margin: "0 auto .2rem"}}/>
                            })
                        }
                    </p>
                    {hash.indexOf("nonebtn") === -1 ?<p className = "text-center"><span className = "btn"
                    onClick = {e => {
                        this.handleAcceptTask()
                    }}>接受任务</span></p> : null}
                </div>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default JDtaskDetail;