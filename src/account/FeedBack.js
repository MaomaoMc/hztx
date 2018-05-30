import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class FeedBack extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: "",
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
    submit (){  //提交留言
        const self = this;
        axios.post(window.baseUrl + "/home/Member/message", qs.stringify({
            token: localStorage.getItem("token"),
            title: self.state.title,
            content: self.state.content
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
        return <div> 
            <Title title = "联系我们" code = {this.state.code}/>
            <div className = "pb_100" style = {{padding: ".2rem .2rem 2rem"}}>
                <h3 style = {{marginBottom: ".2rem"}}>标题</h3>
                <input type="text" value = {this.state.title} style = {{width: "80%", border: ".01rem solid #ddd", height: ".6rem", lineHeight: ".6rem", marginBottom: ".2rem"}} onChange = {e => {
                     this.handleIptChange({type: "title", value: e.target.value})
                 }}/>
                <h3 style = {{marginBottom: ".2rem"}}>内容</h3>
                <textarea name="" id="" cols="30" rows="10" placeholder = "请输入任务内容" style = {{border: ".01rem solid #ddd", width: "100%", textIndent: ".2rem"}}
                   onChange = {e => {
                     this.handleIptChange({type: "content", value: e.target.value})
                 }}></textarea>
                <span className = "btn btn_primary" style = {{width: "95%", height: ".6rem", lineHeight: ".6rem", marginTop: ".2rem"}}
                onClick = {e => {
                    this.submit()
                }}>提交</span>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default FeedBack;