import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class TaskDetail extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {
                title: "",
                content: "",
                money: "",
                member_id: "",
                data: {},
            },
            pic_arr: [],
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
                        window.history.back();
                    }
                })
            }
        , 1000)
    }
    handleAcceptTask (){  //接收任务
        const self = this;
        axios.post(window.baseUrl + "/home/Member/getTask", qs.stringify({
            token: localStorage.getItem("token"),
            task_id: this.props.match.params.id
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
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/taskDetail", qs.stringify({
            token: localStorage.getItem("token"),
            id: this.props.match.params.id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                console.log(data.data.pic)
                self.setState({
                    data: data.data,
                    pic_arr: data.data.pic.split(",")
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        console.log(data, '2')
        return <div> 
            <Title title = "任务详情" code = {this.state.code}/>
            <div className = "taskDetail">
                <h3 className = "text-center">{data.title}</h3>
                <div style = {{lineHeight: ".6rem", padding: ".2rem .3rem"}}>
                    <p>
                        
                        <img src={data.member_pic} alt = "" style = {{width: ".8rem", height: ".8rem"}}/>
                    </p>
                    <p><span className = "f_lt">发布人ID：{data.id_num}</span>
                        <span className = "f_rt fc_red"><span className = "icon">赏</span>{data.money}元</span>
                    </p><br/>
                    <p>发布人昵称：{data.name}</p>
                    <p style = {{marginTop: ".3rem", textIndent: ".3rem"}}>{data.content}</p>
                    <h4>任务所需截图：</h4>
                    <p className = "text-center">
                        {
                            this.state.pic_arr.map(function(pic, i){
                                return <img key = {i} src = {pic} alt="" style = {{display: "block", width: "1.2rem", height: "1.2rem", margin: "0 auto .2rem"}}/>
                            })
                        }
                    </p>
                    <p className = "text-center"><span className = "btn"
                    onClick = {e => {
                        this.handleAcceptTask()
                    }}>接受任务</span></p>
                </div>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default TaskDetail;