import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class PwdControl extends Component {
    constructor(props){
        super(props);
        this.state = {
           oldl_pass: "",
           newl_pass: "",
           renewl_pass: "",
           oldt_pass: "",
           newt_pass: "",
           renewt_pass: "",
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
                        window.location.reload();
                    }
                })
            }
        , 1000)
    }
    handleSubmit (e){
       const type = e.type;
       const state = this.state;
       const self = this;
       let config = {};
       if(type === "1"){
           config = {
            oldpass: state.oldl_pass,
            pass: state.newl_pass,
            repass: state.renewl_pass,
           }
       }
       if(type === "2"){
        config = {
            oldpass: state.oldt_pass,
         pass: state.newt_pass,
         repass: state.renewt_pass,
        }
       }
       axios.post(window.baseUrl + "/home/Member/editPass?token=" + localStorage.getItem("token"), qs.stringify(config)).then(function(res){
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
    render(){
        return <div> 
            <Title title = "密码管理" code = {this.state.code}/>
            <div className = "pwdForm pb_100" style = {{marginTop: "1rem", paddingLeft: ".5rem", paddingRight: ".5rem"}}>
               <ul className = "f_flex">
                   <li>
                       <label>原登录密码:</label>
                       <input type="password" placeholder = "请输入原登录密码" onChange = {e => {
                           this.handleIptChange({type: "oldl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>新登录密码:</label>
                       <input type="password" placeholder = "请输入新登录密码" onChange = {e => {
                           this.handleIptChange({type: "newl_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>确认密码:</label>
                       <input type="password" placeholder = "请重新输入新登录密码" onChange = {e => {
                           this.handleIptChange({type: "renewl_pass", value: e.target.value})
                       }}/>
                   </li>
               </ul>
               <span className = "btn btn_primary" onClick = {e => {
                   this.handleSubmit({type: "1"})
               }}>完成</span>
               <ul className = "f_flex">
                   <li>
                       <label>原交易密码:</label>
                       <input type="password" placeholder = "请输入原交易密码" onChange = {e => {
                           this.handleIptChange({type: "oldt_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>新交易密码:</label>
                       <input type="password" placeholder = "请输入新交易密码" onChange = {e => {
                           this.handleIptChange({type: "newt_pass", value: e.target.value})
                       }}/>
                   </li>
                   <li>
                       <label>确认密码:</label>
                       <input type="password" placeholder = "请重新输入新交易密码" onChange = {e => {
                           this.handleIptChange({type: "renewt_pass", value: e.target.value})
                       }}/>
                   </li>
               </ul>
               <span className = "btn btn_primary" onClick = {e => {
                   this.handleSubmit({type: "2"})
               }}>完成</span>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null }
            <Footer />
        </div>
    }
}

export default PwdControl;