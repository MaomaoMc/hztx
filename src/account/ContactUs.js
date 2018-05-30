import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ContactUs extends Component {
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
        const company_data = JSON.parse(localStorage.getItem("company_data"));
        return <div> 
            <Title title = "联系我们" code = {this.state.code}/>
            <div className = "pb_100" style = {{padding: ".2rem .2rem 2rem"}}>
                <h3 style = {{marginBottom: ".2rem"}}>联系方式：</h3>
                <p>qq1：{company_data.qq1}</p>
                <p>qq2：{company_data.qq2}</p>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default ContactUs;