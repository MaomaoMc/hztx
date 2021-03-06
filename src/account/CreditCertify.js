import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from '../WarningDlg';

class CreditCertify extends Component{
    constructor (props){
        super(props);
        this.state = {
            bank_user: "",
            bank_name: "",
            bank_num: "",
            warningDlgShow: false,
            warningDlgText: "",
        }
    }
    handleInputChange (e){
        const type = e.type;
        this.setState({
            [type]: e.value
        })
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                }, function(){
                    if(obj && obj.code === 1){  //操作成功的话  回到个人中心页面
                        window.history.back();
                    }
                })
            }
        , 1000)
    }
    submit (){ //提交
        const self = this;
        const bank_user = this.state.bank_user;
        const bank_name = this.state.bank_name;
        const bank_num = this.state.bank_num;
        console.log(bank_user, 'sd')
        axios.post(window.baseUrl + "/home/Member/bindBankNum", qs.stringify({
            token: localStorage.getItem("token"),
            bank_user: bank_user,
            bank_name: bank_name,
            bank_num: bank_num
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            self.setState({
                warningDlgShow: true,
                warningDlgText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code})
            })
        })
    }
    render (){
        const type = this.props.match.params.type;
        const data = this.state.data;
        return <div>
            <Title title="银行卡认证"/>
            {type === "authorized" ? 
                <div className="certify fz_26 fc_white">
                    <div style={{padding: '.2rem'}}>
                        <p style={{textAlign: 'right'}}>{data.bank_name}</p>
                        <p className="fz_24" style={{textAlign: 'right'}}>储蓄卡</p>
                        <p className="text_center">
                            <span className="ml_30">****</span>
                            <span className="ml_30">****</span>
                            <span className="ml_30">****</span>
                            <span className="ml_30">****</span>
                            <span className="ml_30">{data.bank_num.substr(-4)}</span>
                        </p>
                        <p style={{textAlign: 'left'}}>持卡人：{data.bank_user}</p>
                    </div>
                </div> : 
                <div className="pwdForm fz_26" style = {{marginTop: "1rem", paddingLeft: ".5rem", paddingRight: ".5rem"}}>
                    <ul className = "f_flex">
                            <li>
                            <label>持卡人:</label>
                            <input type="text" placeholder = "请输入持卡人姓名" value = {this.state.bank_user} onChange = {e => {
                                this.handleInputChange({type: "bank_user", value: e.target.value})
                            }}/>
                        </li>
                        <li>
                            <label>银行名称:</label>
                            <input type="text" placeholder = "请输入银行名称" value = {this.state.bank_name} onChange = {e => {
                                this.handleInputChange({type: "bank_name", value: e.target.value})
                            }}/>
                        </li>
                        <li>
                            <label>银行卡号:</label>
                            <input type="text" placeholder = "请确认银行卡号" value = {this.state.bank_num} onChange = {e => {
                                this.handleInputChange({type: "bank_num", value: e.target.value})
                            }}/>
                        </li>
                    </ul>
                    <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{ width: '100%' }}
                        onClick={e => {
                            this.submit()
                        }}>提交</span>
                </div>
            }
           {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningDlgText}/> : null}
        </div>
    }
}

export default CreditCertify;