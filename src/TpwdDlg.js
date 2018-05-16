import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TpwdDlg extends Component {
    constructor(props){
        super(props);
        this.state = {
            t_pass: ""
        }
    }
    handlePwdEvent (e){
        this.setState({
            t_pass: e.value
        })
    }
    render(){
        const self = this;
        return <div> 
            <div className = "dialog dlgPayPwd">
                <div className="dlg_form">
                    <p className="text_center">请输入支付密码：</p>
                    <input className="b_blue1" type="password" value = {this.state.t_pass} 
                    onChange = {e => {
                        this.handlePwdEvent({value: e.target.value})
                    }}
                    />
                    <div className="fgtTradepass"><Link to = "/account/forgetTradePwd"><span className="fz_24 fc_blue">忘记交易密码?</span></Link></div>
                    <div className="over_hidden" style={{marginTop: ".2rem"}}>
                        <span className="btn f_lt btn_default" onClick = {e => {
                            self.setState({
                                  t_pass: ""  
                            }, function(){
                                this.props.canCelFun()
                            })
                        }}>取消</span>
                        <span className="btn f_rt btn_primary" onClick = {e => {
                            this.props.confirmFun({t_pass: this.state.t_pass})
                        }}>确定</span>
                    </div>
                </div>
            </div>
           <div id = "shadow"></div>
        </div>
    }
}

export default TpwdDlg;