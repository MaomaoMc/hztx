import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from './../Title';
import Footer from './../Footer';
import WarningDlg from './../WarningDlg';

class BusinessCoop extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: "",
            warningShow: false,
            warningText: "",
            code: ""
        }
    }
    hanleWarningDlgTimer (){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningShow: false
                })
            }
        , 1000)
    }
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Company/cooperation", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data
                })
            }else{  //失败
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
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
        return <div> 
            <Title title = "商务合作"/>
            <table className = "normal_table" style = {{backgroundColor: "white", marginTop: ".3rem"}}>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>邮箱</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.length > 0 && data.map(function(item ,i){
                        return <tr>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default BusinessCoop;