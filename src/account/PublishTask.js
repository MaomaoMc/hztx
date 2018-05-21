// PublishTask
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class PublishTask extends Component {
    constructor (props){
        super(props);
        this.state = {
            type_arr: [],
            title : "",
            content : "",
            money : "",
            time : "",
            pic : "",
            typeid : "",
            num : "",
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
    handleIptChange (e){
        this.setState({
            [e.type]: e.value
        })
    }
    handleUploadPic (e){  //上传图片
        const self = this;
        let file = document.getElementById("photo").files[0];
        let formData = new FormData()  // 创建form对象
        formData.append('pic', file)  // 通过append向form对象添加数据
        axios.post(window.baseUrl +  "/home/Base/uploadPic?token=" + localStorage.getItem("token"), formData, {
            transformRequest: [(data) => data],
            headers: {}
        }).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){ //成功
                let pic_arr = self.state.pic_arr;
                const pic = window.baseUrl + data.data;
                pic_arr.push(pic)
                self.setState({
                    pic_arr: pic_arr
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer();
                })
             }
        })
    }
    handlePublish (){  //发布任务
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Member/setTask", qs.stringify({
            token: localStorage.getItem("token"),
            title : state.title,
            content : state.content,
            money : state.money,
            time : state.time,
            pic : state.pic,
            typeid : state.typeid,
            num : state.num,
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    type_arr: data.data
                })
            }
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
        axios.post(window.baseUrl + "/home/Member/getTaskclass", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    type_arr: data.data,
                    typeid: data.data[0].id
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
        const type_arr = this.state.type_arr;
        const pic_arr = this.state.pic_arr;
        console.log(pic_arr, '999')
        return <div> 
            <Title title = "发布任务" code = {this.state.code}/>
            <ul className = "f_flex personalUl pb_100">
                <li>
                    <label>任务名称：</label> 
                    <input type="text" placeholder = "请输入任务名称" value = {this.state.title} onChange = {e => {
                        this.handleIptChange({type: "title", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label>任务类型：</label> 
                    <select onChange = {e => {
                        this.handleIptChange({type: "typeid", value: e.target.value})
                    }}>
                        {
                            type_arr.length > 0 && type_arr.map(function(type, i){
                                return <option key = {i} value = {type.id}>{type.name}</option>
                            })
                        }
                    </select>
                </li>
                <li>
                    <label style = {{verticalAlign: "top"}}>任务内容：</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder = "请输入任务内容" onChange = {e => {
                        this.handleIptChange({type: "content", value: e.target.value})
                    }}></textarea>
                </li>
                <li>
                    <label>任务金额：</label> 
                    <input type="text" placeholder = "请输入任务金额" value = {this.state.money} onChange = {e => {
                        this.handleIptChange({type: "money", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label>任务时间：</label> 
                    <input type="text" placeholder = "请输入任务时间" value = {this.state.time} onChange = {e => {
                        this.handleIptChange({type: "time", value: e.target.value})
                    }}/>
                </li>
                <li style = {{height: "auto"}}>
                    <label>图片路径：</label> 
                    {
                        pic_arr.length > 0 && pic_arr.map(function(pic, i){
                            return <i key = {i} style = {{display: "block", width: "1.5rem", height: "1.5rem",
                             backgroundImage: "url(" + pic +")", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", marginLeft: "26%", marginBottom: ".2rem"}}></i>
                        })
                    }
                    <form action="" id="form" style = {{display: "inline"}}> 
                        <span className = "upload_wrap">
                            <span className = "btn btn_primary upload">上传图片</span>
                            <input type="file" name="photo" id="photo" style = {{width: "1.55rem"}}
                                    onChange = {e => {this.handleUploadPic({value: e.target.value, obj: e.target})}}
                                    />
                        </span>
                    </form>
                </li>
                <li>
                    <label>任务数量：</label> 
                    <input type="text" placeholder = "请输入任务数量" value = {this.state.num} onChange = {e => {
                        this.handleIptChange({type: "num", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <span className = "btn btn_primary" style = {{width: "100%", height: ".6rem", lineHeight: ".6rem"}}
                    onClick = {e => {
                        this.handlePublish()
                    }}>发布</span>
                </li>
            </ul>
            {this.state.warningShow ? 
                <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default PublishTask;