import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const defaultHeadPic = require("../img/pic_morentx.png");
class PersonalItems extends Component {
    constructor(props){
        super(props);
        const head_pic = localStorage.getItem("head_pic");
        this.state = {
            profile_pic: head_pic === "null" ? defaultHeadPic : head_pic ,//头像
            editName: false,  //是否编辑了 昵称
            member_id: "",
            username: "",
            phone: "",
            y_code: "",  //验证码
            card_num: "",
            zfb_num: "",
            wx_num: "",
            bank_name: "",
            bank_num: "",
            t_pass: "",
            t_repass: "",
            warningShow: false,
            warningText: "",
            code: ""
        }
    }
    setHeadPic (){//修改头像
        const self = this;
        axios.post(window.baseUrl +  "/home/Member/uploadPic", qs.stringify({
            token: localStorage.getItem("token"),
            pic: self.state.profile_pic
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                localStorage.setItem("head_pic", self.state.profile_pic);
            }
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                setTimeout(
                    function(){
                        self.setState({
                            warningShow: false
                        }, function(){
                            if(code === 1){
                                // window.location.reload();
                            }
                        })
                    }
                , 1000)
            })
        })
    }
    uploadedFile (e){ //上传图片
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
                const pic = window.baseUrl +  data.data;
                self.setState({
                    profile_pic: pic
                }, function(){
                    self.setHeadPic()
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
    checkMobile (phone){ //手机号码验证
        if(!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone))){ 
         return false; 
        } else{
          return true;
        }
      }
    passValidate (e){
        const value = e.value;
        const page_type = this.state.page_type;
        if(page_type === 2){ //交易密码
            if(value.length < 6){
                this.setState({
                    warningShow: true,
                    warningText: "交易密码不能小于6位"
                }, function(){
                    this.hanleWarningDlgTimer()
                })
                return;
            } 
        }
        
        if(!(/^[A-Za-z0-9]+$/.test(value))){  //密码只能是6位数 的字母加数字
            this.setState({
                warningShow: true,
                warningText: "密码只能是字母或数字组成"
            }, function(){
                this.hanleWarningDlgTimer()
            })
            return;
        }
    }
    submit (){  //提交
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Member/realName", qs.stringify({
            token: localStorage.getItem("token"),
            name: state.name,
            username: state.username,
            phone: state.phone,
            card_num: state.card_num,
            zfb_num: state.zfb_num,
            wx_num: state.wx_num,
            bank_name: state.bank_name,
            bank_num: state.bank_num,
            // pic: state.profile_pic , //头像
            t_pass: state.t_pass,
            t_repass: state.t_repass
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
        axios.post(window.baseUrl + "/home/Member/member", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                const obj = data.data[0];
                localStorage.setItem("head_pic", obj.pic)
                self.setState({
                    profile_pic: obj.pic,
                    member_id: obj.member_id,
                    name: obj.name,
                    username: obj.username,
                    phone: obj.phone,
                    card_num: obj.card_num,
                    zfb_num: obj.zfb_num,
                    wx_num: obj.wx_num,
                    bank_name: obj.bank_name,
                    bank_num: obj.bank_num,
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
    editName (e){  //设置昵称
        const type = e.type;
        if(type === "edit"){
            this.setState({
                editName: true
            });
            return;
        }
        const self = this;
        axios.post(window.baseUrl + "//home/Member/editName", qs.stringify({
            token: localStorage.getItem("token"),
            name: self.state.name
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const state = this.state;
        const countDown = state.countDown;
        const profile_pic = state.profile_pic;
        return <div> 
            <Title title = "个人资料" code = {this.state.code} />
            <div className = "pb_100">
                <div className="file"  >
                    <form action="" id="form"> 
                        <input type="file" name="photo" id="photo"
                            onChange = {e => {this.uploadedFile({value: e.target.value, obj: e.target})}}
                            />
                            <img src={profile_pic} alt=""/>
                    </form>
                </div>  
                <p className = "text-center" style = {{fontSize: ".12rem", color: "#999", marginTop: ".1rem"}}>点击可修改头像</p>
                <ul className="lists f_flex fz_26 mb_100">
                    <li>
                        <span className="f_lt">ID</span>
                        <span className="f_rt">
                            <span className="fc_blue">{state.member_id}</span>
                        </span>
                    </li>
                    <li>
                        <span className="f_lt">设置昵称</span>
                        <span className="f_rt">
                            {state.name  === "" || this.state.editName ?
                                <span>
                                    <input type = "text"  value = {state.name} placeholder = "输入昵称"
                                    style = {{height: ".6rem", lineHeight: ".6rem", 
                                    border: ".01rem solid #0093fb", borderRadius: ".05rem", textIndent: ".15rem", marginRight: ".1rem"}}
                                     onChange = {e => {
                                         this.setState({
                                             name: e.target.value
                                         })
                                     }}/>
                                    <span className="btn btn_primary" onClick = {e => {
                                        this.editName({type: "submit"})
                                    }}>完成</span>
                                </span> : <span>
                                    <span style = {{marginRight: ".1rem"}}>{state.name}</span>
                                    <span className="btn btn_primary" onClick = {e => {
                                        this.editName({type: "edit"})
                                    }}>修改</span>
                                </span>
                            }
                            
                        </span>
                    </li>
                    <li>
                        {state.phone === "" ? <Link to = "/account/creditCertify/unauthorized">
                            <span className="f_lt">手机号验证</span>
                            <span className="f_rt">
                                <span className="fc_blue">{state.bank_num}</span>
                                <span className="mark unauthorized">未认证</span>
                            </span>
                        </Link> : <span><span className="f_lt">手机号验证</span>
                                <span className="f_rt">
                                    <span className="fc_blue">{state.phone}</span>
                                    <span className="mark authenticated">已认证</span>
                                </span>
                            </span>
                        }
                    </li>
                    <li>
                        {state.bank_num === "" ? <Link to = "/account/creditCertify/unauthorized">
                            <span className="f_lt">银行卡</span>
                            <span className="f_rt">
                                <span className="fc_blue">{state.bank_num}</span>
                                <span className="mark unauthorized">未认证</span>
                            </span>
                        </Link> :  <span><span className="f_lt fc_blue">银行卡</span>
                                <span className="f_rt">
                                    <span className="fc_blue">{state.bank_num}</span>
                                    <span className="mark authenticated">已认证</span> 
                                </span>
                            </span>
                        }
                    </li>
                    <li>
                        {state.username === "" ? <Link to = "/account/certify/unauthorized">
                            <span className="f_lt">实名认证</span>
                            <span className="f_rt">
                                <span className="fc_blue">{state.username}</span>
                                <span className="mark unauthorized">未认证</span>
                            </span>
                        </Link> : <span><span className="f_lt fc_blue">实名认证</span>
                                <span className="f_rt">
                                    <span className="fc_blue">{state.username}</span>
                                    <span className="mark authenticated">已认证</span> 
                                </span>
                            </span>
                        }
                    </li>
                    <li style={{height: ".21rem"}}></li>
                    <li>
                        {state.wx_num === "" ? <Link to="/account/weChatBind">
                            <span className="f_lt">微信</span>
                            <span className="f_rt">
                                <span className="mark unauthorized">未认证</span>
                            </span>
                        </Link> : <a>
                            <span className="f_lt">微信</span>
                            <span className="f_rt">
                                <span className="fc_blue">{state.wx_num}</span>
                                <span className="mark authenticated">已认证</span> 
                            </span>
                        </a>}
                    </li>
                    <li>
                        {state.zfb_num === "" ? <Link to="/account/aliPayBind">
                            <span className="f_lt">支付宝</span>
                            <span className="f_rt">
                                <span className="mark unauthorized">未认证</span>
                            </span>
                        </Link> :
                        <a>
                            <span className="f_lt">支付宝</span>
                            <span className="f_rt">
                                <span className="fc_blue">{state.zfb_num}</span>
                                <span className="mark authenticated">已认证</span> 
                            </span>
                        </a>}
                    </li>
                    <li>
                        <Link to="/account/setpwd">
                            <span className="f_lt">设置交易密码</span>
                            <span className="f_rt">
                            <span className="go_arrow"></span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account/changeLoginPwd">
                            <span className="f_lt">修改登录密码</span>
                            <span className="f_rt">
                            <span className="go_arrow"></span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account/changeTradePwd"> 
                            <span className="f_lt">修改交易密码</span>
                            <span className="f_rt">
                            <span className="go_arrow"></span> 
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default PersonalItems;