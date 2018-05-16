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
    handleFinishTask (e){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/completeTask  ", qs.stringify({
            token: localStorage.getItem("token"),
            id: e.id
        })).then(function(res){
            console.log(res)
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
        // const task = data[0].task[0];  //任务信息
        // const member = data.member; //接收人列表
        return <div> 
            <Title title = "审核任务"/>
            <div className = "pb_100">
                {data.length > 0 ? <div style = {{overflow: "hidden", padding: ".2rem"}}>
                    
                    {/* <p style = {{fontSize: ".24rem", textAlign: "right"}}>{task.add_time}</p> */}
                    <img src={window.baseUrl + data[0].task[0].pic} alt="" className = "f_lt" style = {{width: "1rem", height: "1rem"}}/>
                    <h4>{data[0].task[0].title}</h4>
                </div> : null}
                <ul className="taskLists f_flex">
                    {
                        data.length === 0 ? <li>暂时没有数据可显示...</li> :
                        data.length > 0  && data.map(function (list, i) {
                                const status = list.status;
                                const member = list.member[0];
                                return <li key={i}>
                                    <div className = "f_lt">
                                        <p style={{ fontSize: ".24rem"}}>接收人姓名：{member.name}</p>
                                        <p style={{ fontSize: ".24rem", marginTop: ".1rem"}}>接收人ID：{member.id_num}</p>
                                    </div>
                                    <div className="f_rt"  style={{textAlign: "right"}}>
                                        <span className = "btn btn_orange" onClick = {e => {
                                            self.handleFinishTask({id: data[0].id})
                                        }}>完成</span>
                                        <p style={{ fontSize: ".24rem", marginTop: ".1rem"}}>{new Date(parseInt(list.add_time)).format("yyyy-MM-dd")}</p>
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