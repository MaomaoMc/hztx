import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class MyPedTasks extends Component {
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
        axios.post(window.baseUrl + "/home/Member/mysetTask", qs.stringify({
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
        const self = this;
        const data = this.state.data;
        return <div> 
            <Title title = "发布的任务" code = {this.state.code}/>
            <div className = "pb_100">
                <ul className="taskLists f_flex">
                    {
                        data.length === 0 ? <li>暂时没有数据可显示...</li> :
                            data.length > 0 && data.map(function (list, i) {
                                const status = list.status;
                                return <li key={i}>
                                        <a style = {{display: "block", width: "100%", height: "100%", 
                                    position: "absolute", left: "0", top: "0", zIndex: "1"}} onClick = {e => {
                                            self.props.history.push("/task/taskDetail/" + list.id + "/nonebtn/myped")
                                        }}></a>
                                    <img className="f_lt" src={list.pic} alt="" style = {{marginRight: ".1rem"}}/>
                                    <div className="f_lt">
                                        <h4>{list.title}</h4>
                                        <p style={{ fontSize: ".24rem", color: "#666", marginTop: ".1rem" }}>赚{list.count} 接{list.ynum} 剩{list.leftover}</p>
                                    </div>
                                    <div className="f_rt">  
                                        {status === "进行中" ? <p>
                                            <span className = "btn btn_orange" style = {{position: "relative",zIndex: 2}} onClick = {e => {
                                                self.props.history.push("/task/examineTask/" + list.id)
                                            }}>审核</span>
                                            </p>:
                                             <p>{status}</p>}
                                        <p style = {{fontSize: ".12rem", textAlign: "right", marginTop: ".2rem"}}>{list.add_time}</p>
                                    </div>
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

export default withRouter(MyPedTasks);