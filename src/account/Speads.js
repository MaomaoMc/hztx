import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from './../Title';
import Footer from './../Footer';
import WarningDlg from './../WarningDlg';

class Speads extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],  //推广列表
            hash: window.location.hash,
            warningShow: false,
            warningText: ""
        };
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
        axios.post(window.baseUrl + "/home/Member/subordinate", qs.stringify({
            token: localStorage.getItem("token"),
            member_id: self.props.match.params.id
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
    componentDidMount (){
        this.ajax();
    }
    componentDidUpdate (){
        if(window.location.hash !== this.state.hash){
            this.setState({
                hash: window.location.hash
            }, function(){
                this.ajax();
            })
        }
    }
    render (){
        return <div>
            <Title title="推广" code = {this.state.code}/>
            <table className = "normal_table" style = {{backgroundColor: "white", marginTop: ".3rem"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>微信号</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.length === 0 ? <tr><td colSpan = "4">暂无下级推广人</td></tr>: null}
                    {
                        this.state.data.length > 0 && this.state.data.map(function(item, i){
                            return <tr key = {i}>
                                <td>{item.member_id}</td>
                                <td><Link to = {"/account/speads/" + item.member_id}>{item.name}</Link></td>
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

export default Speads;