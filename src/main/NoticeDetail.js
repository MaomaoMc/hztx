// 
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class NoticeDetail extends Component {
    constructor (props){
        super(props);
        console.log(this.props.match.params.id, '77')
        this.state = {
            data: {
                title: "",
                content: "",
                money: "",
                member_id: "",
                warningShow: false,
                warningText: "",
                code: ""
            }
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
        console.log(self.state.task_id, '99')
        axios.post(window.baseUrl + "/home/Member/taskDetail", qs.stringify({
            token: localStorage.getItem("token"),
            id: this.props.match.params.id
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        return <div> 
            <Title title = "任务详情" code = {this.state.code}/>
            <div className = "taskDetail">
                <h3 className = "text-center">{data.title}</h3>
                <div style = {{padding: ".2rem .3rem"}}>
                    <p><span className = "f_lt">发布人ID：{data.member_id}</span>
                        <span className = "f_rt fc_red"><span className = "icon">赏</span>{data.money}元</span>
                    </p><br/>
                    <p style = {{marginTop: ".3rem", textIndent: ".3rem"}}>{data.content}</p>
                    {/* <p className = "text-center"><span className = "btn"
                    onClick = {e => {
                        this.handleAcceptTask()
                    }}>接收任务</span></p> */}
                </div>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default NoticeDetail;