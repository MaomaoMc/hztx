import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const nav = [
    {
        text: "任务列表",
        link: "/account/jdTask"
    },
    {
        text: "我接受的任务",
        link: "/account/jdmyAcceptTask"
    }
]
class JDTask extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],
            warningShow: false,
            warningText: "",
            code: ""
        }
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
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Jdtask/jdtaskList", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data
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
    componentDidMount (){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        const hash = window.location.hash.substring(1);
        return <div> 
            <Title title = "金豆任务列表" code = {this.state.code}/>
            <div className = "pb_100">
            <ul className = "head_nav f_flex">
                {
                    nav.map(function(item, i){
                        return <li key = {i} className = {hash === item.link? "active" : ""}>
                            <Link to = {item.link}>{item.text}</Link>
                        </li>
                    })
                }
            </ul>
                <ul className="taskLists f_flex">
                    {
                        data.length === 0 ? <li>暂时没有数据可显示...</li> :
                            data.length > 0 && data.map(function (list, i) {
                                return <li key={i}>
                                    <Link to = {"/account/jdtaskDetail/" + list.id}>
                                        <img className="f_lt" src={list.pic} alt="" style = {{marginRight: ".1rem"}}/>
                                        <div className="f_lt">
                                            <h4>{list.title}</h4>
                                            <p style={{ fontSize: ".24rem", color: "#666", marginTop: ".1rem" }}>赚{list.count} 接{list.ynum} 剩{list.leftover}</p>
                                        </div>
                                        <div className="f_rt">
                                            <p className="fc_red"><span className="icon">赏</span><span>{list.jd}金豆</span></p>
                                            <p style={{ fontSize: ".24rem", color: "#666", marginTop: ".1rem" }}>{list.add_time}</p>
                                        </div>
                                    </Link>
                                </li>
                            })
                    }
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default withRouter(JDTask);