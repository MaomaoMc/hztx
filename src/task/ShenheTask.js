import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class ShenheTask extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {
                id: "",
                member_id: "",
                member: {
                    id_num: "",
                    name: "",
                    pic: ""
                },
                task: {
                    title: "",
                    add_time: "",
                    money: "",
                    content: ""
                },
                pic: "",
                note: "",
                // data: {},
            },
            fullScreen: false,
            imgSrc: "",
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
    passTask (){  //通过审核
        const self = this;
        axios.post(window.baseUrl + "/home/Member/completeTask", qs.stringify({
            token: localStorage.getItem("token"),
            id: this.props.match.params.id
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
        axios.post(window.baseUrl + "/home/Member/auditing", qs.stringify({
            token: localStorage.getItem("token"),
            id: this.props.match.params.id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            const pic = data.data.pic;
            if(code === 1){
                self.setState({
                    data: data.data,
                    pic_arr: pic ? pic.split(",") : []
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
        const member = data.member;
        const task = data.task;
        const hash = window.location.hash, self = this;
        return <div> 
            <Title title = "任务审核页面" code = {this.state.code}/>
            <div className = "taskDetail">
                <h3 className = "text-center">{data.title}</h3>
                <div style = {{lineHeight: ".6rem", padding: ".2rem .3rem"}}>
                    <p>
                        <img src={member.pic} alt = "接受人头像" style = {{width: ".8rem", height: ".8rem"}}/>
                    </p>
                    <p><span className = "f_lt">接受人ID：{member.id_num}</span>
                        
                    </p><br/>
                    <p>接受人昵称：{member.name}</p>
                    <div><h4>任务名称：{task.title}</h4>
                    <span className = "f_rt fc_red" style = {{marginTop: "-.5rem"}}><span className = "icon">赏</span>{task.money}元</span></div>
                    <h4>任务内容：</h4>
                    <p style = {{marginTop: ".3rem", textIndent: ".3rem"}}>{task.content}</p>
                    <h4>任务所需截图：</h4>
                    <p className = "text-center">
                        {
                            this.state.pic_arr.map(function(pic, i){
                                return <img key = {i} src = {pic} alt="" style = {{display: "block", width: "1.2rem", height: "1.2rem", margin: "0 auto .2rem"}}
                                onClick = {e => {
                                    self.setState({
                                        fullScreen: true,
                                        imgSrc: pic})
                                }}/>
                            })
                        }
                    </p>
                    {hash.indexOf("nonebtn") === -1 ?<p className = "text-center"><span className = "btn"
                    onClick = {e => {
                        this.passTask()
                    }}>通过审核</span></p> : null}
                </div>
            </div>
            {this.state.fullScreen ? 
                <div className = "fullScreen" style = {{backgroundImage: "url("+ this.state.imgSrc +")"}} onClick = {e => {
                    this.setState({
                        fullScreen: false,
                        imgSrc: ""
                    })
                }}></div> : null}
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default ShenheTask;