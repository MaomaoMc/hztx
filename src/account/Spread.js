import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import QRCode from 'qrcode.react';
//引入
import copy from 'copy-to-clipboard';
import Title from './../Title';
import Footer from './../Footer';
import WarningDlg from './../WarningDlg';

class Spead extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],  //推广列表
            my_data: [],  //下级推广
            id_num: "",
            code: "",
            path: "", // 保存二维码SVG的path
            warningShow: false,
            warningText: ""
        };
    }
    copy (e){
        //使用方法
        copy(e.text);
        alert("复制成功");
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
        axios.post(window.baseUrl + "/home/Member/spread", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                const id_num = data.data[0].id_num;
                self.setState({
                    id_num: id_num,
                    path: window.baseUrl + "/build/index.html?#/register?tui_id=" + id_num
                })
            }else{  //失败
                self.setState({
                    warningShow: true,
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
            }
            self.setState({
                code: code
            })
        })
    }
    speadAjax (){  //推广列表ajax
        const self = this;
        axios.post(window.baseUrl + "/home/Member/subordinate", qs.stringify({
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
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
            }
            self.setState({
                code: code
            })
        })
    }
    componentDidMount (){
        this.ajax();
        this.speadAjax();
    }
    render (){
        return <div className = "pb_100">
            <Title title="推广" code = {this.state.code}/>
            <div style = {{padding: ".2rem"}}>
                <p className = "">我的推荐链接</p>
                <p style = {{margin: ".2rem 0"}}>
                    <span className="inviteLink">{this.state.path} </span>
                    <span className = "btn btn_primary"
                    onClick = {e => {this.copy({text: this.state.path})}}
                    >复制</span>
                </p>
            </div>
            <div className = "inviteOpt">
                <div>{this.state.path !== "" ? <QRCode value = {this.state.path} style = {{width: "100%", height: "100%"}}/> : null}</div>
            </div>
            <table className = "normal_table" style = {{backgroundColor: "white", marginTop: ".3rem"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>手机号</th>
                        <th>微信号</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map(function(item, i){
                           
                            return <tr key = {i}>
                                <td><Link to = {"/account/speads/" + item.member_id}>{item.id_num}</Link></td>
                                <td>{item.phone}</td>
                                <td>{item.wx_num}</td>
                            </tr>
                        })
                    }
                    
                </tbody>
            </table>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default Spead;