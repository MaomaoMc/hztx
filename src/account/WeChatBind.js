import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from './../WarningDlg';

class WeChatBind extends Component{
    constructor (props){
        super(props);
        this.state ={
            wx_num: "",  //账号
            warningDlgShow: false,
            warningText: "",
            code: ""
        }
    }
    handleInputChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                }, function(){
                    if(obj && obj.code === 1){
                        window.history.back();
                    }
                })
            }
        , 1000)
    }
    submit (){ //提交
        const self = this;
        axios.post(window.baseUrl + "/home/Member/bindWxNum", qs.stringify({
            token: localStorage.getItem("token"),
            wx_num: self.state.wx_num
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code});
            })
        })
    }
    render (){
        return <div>
            <Title title="微信绑定" code = {this.state.code}/>
            <div className="pwdForm fz_26" style = {{marginTop: "1rem", paddingLeft: ".5rem", paddingRight: ".5rem"}}>
                <ul className = "f_flex">
                        <li>
                        <label>账号:</label>
                        <input type="text" placeholder = "请输入微信账号" onChange = {e => {
                            this.handleInputChange({type: "wx_num", value: e.target.value})
                        }}/>
                    </li>
                </ul>
                <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{ width: '95%' }}
                    onClick={e => {
                        this.submit({})
                    }}>提交</span>
            </div>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default WeChatBind;