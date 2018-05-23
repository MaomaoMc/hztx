// 
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ExamineTask extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: [],
            task: {
                title: "",
                id: "",
                content: "",
                leftover: "",
                ynum: ""
            }, //任务详情
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
        axios.post(window.baseUrl + "/home/Member/totaskList", qs.stringify({
            token: localStorage.getItem("token"),
            task_id: self.props.match.params.id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                   data: data.data,  //接收人列表
                   task: data.task
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
    handleFinishTask (e){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/completeTask  ", qs.stringify({
            token: localStorage.getItem("token"),
            id: e.id
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
    componentDidMount (){
        this.ajax();
    }
    render(){
        const self = this;
        const data = this.state.data;
        const task = this.state.task;
        return <div> 
            <Title title = "审核任务" code = {this.state.code}/>
            <div className = "pb_100">
                <div style = {{overflow: "hidden", backgroundColor: "#eaf7ff", padding: ".2rem"}}>
                    {/* <img src={task.pic} alt="" className = "f_lt" style = {{width: "1rem", height: "1rem", marginRight: ".2rem"}}/> */}
                    <h4>{task.title}</h4>
                    <p style = {{fontSize: ".24rem"}}>赚{task.count} 接{task.ynum} 剩{task.leftover}</p>
                    <p style = {{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{task.content}</p>
                </div>
                <ul className="taskLists f_flex">
                    {
                        data.length === 0 ? <li>暂时没有接收人数据可显示...</li> :
                        data.length > 0  && data.map(function (list, i) {
                                const status = list.status;
                                const member = list.member[0];
                                return <li key={i}>
                                    <div className = "f_lt">
                                        <p style={{ fontSize: ".24rem"}}>接收人姓名：{member.name}</p>
                                        <p style={{ fontSize: ".24rem", marginTop: ".1rem"}}>接收人ID：{member.id_num}</p>
                                    </div>
                                    <div className="f_rt"  style={{textAlign: "right"}}>
                                        {status === "已提交" ? <span className = "btn btn_orange" onClick = {e => {
                                            self.handleFinishTask({id: list.id})
                                        }}>完成</span> : <span>{status}</span>}
                                        <p style={{ fontSize: ".24rem", marginTop: ".1rem"}}>{new Date(list.add_time * 1000).format("yyyy-MM-dd")}</p>
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

export default ExamineTask;