import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import QRCode from 'qrcode.react';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class PublishTask extends Component {
    constructor (props){
        super(props);
        const hash = window.location.hash;
        let page_type = hash.indexOf("editTask") !== -1 ? "edit_task" : "publish_task";
        this.state = {
            page_type: page_type,
            type_arr: [],
            title : "",
            content : "",
            money : "",
            time : "",
            pic : "",
            typeid : "",
            num : "",
            url: "", //任务链接
            qr_code: "", //任务二维码
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
    deletePic (e){  //删除图片
      const index = e.index;
      const pic_arr = this.state.pic_arr;
      pic_arr.splice(index, 1);
      this.setState({
        pic_arr: pic_arr
      })
    }
    handlePublish (){  //发布任务
        const self = this;
        const state = this.state;
        const page_type = state.page_type;
        axios.post(window.baseUrl + "/home/Member/setTask" + (page_type === "edit_task" ? "?task_id=" + self.props.match.params.id : ""), qs.stringify({
            token: localStorage.getItem("token"),
            title : state.title,
            content : state.content,
            money : state.money,
            time : state.time,
            pic : state.pic_arr.join(","),
            typeid : state.typeid,
            num : state.num,
            url : state.url,
            qr_code: document.getElementById("output").childNodes[0].toDataURL("image/png")
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
                    typeid: data.data[0].id,
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
    getEditTaskAjax(){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/editTask", qs.stringify({
            token: localStorage.getItem("token"),
            task_id: self.props.match.params.id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                const task_data = data.data;
                self.setState({
                    data: task_data,
                    typeid: task_data.taskclass_id,
                    title : task_data.title || "",
                    content : task_data.content || "",
                    money : task_data.money || "",
                    time : task_data.time || "",
                    pic : task_data.pic || "",
                    num : task_data.num || "",
                    url: task_data.url || "", //任务链接
                    // qr_code: task_data.qr_code, //任务二维码
                    pic_arr: task_data.pic.split(","),
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
        const page_type = this.state.page_type;
        if(page_type === "edit_task"){  //修改任务页面的话
            this.getEditTaskAjax();
        }
    }
    render(){
        const type_arr = this.state.type_arr;
        const pic_arr = this.state.pic_arr;
        const page_type = this.state.page_type;
        const self = this;
        return <div> 
            <Title title = {page_type === "edit_task" ? "修改任务" : "发布任务"} code = {this.state.code}/>
            <ul className = "f_flex personalUl pb_100">
                <li>
                    <label>任务名称：</label> 
                    <input type="text" placeholder = "请输入任务名称" value = {this.state.title} onChange = {e => {
                        this.handleIptChange({type: "title", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label>任务类型：</label> 
                    <select value = {this.state.typeid} onChange = {e => {
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
                    <label>任务单价：</label> 
                    <input type="text" placeholder = "请输入任务金额" value = {this.state.money} onChange = {e => {
                        this.handleIptChange({type: "money", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label>任务数量：</label> 
                    <input type="text" placeholder = "请输入任务数量" value = {this.state.num} onChange = {e => {
                        this.handleIptChange({type: "num", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label>任务总价：</label> 
                    <span>{(this.state.money * this.state.num * 1).toFixed(2)}</span>
                </li>
                
                <li>
                    <label>任务时限：</label> 
                    <input type="text" placeholder = "请输入任务时限" value = {this.state.time} onChange = {e => {
                        this.handleIptChange({type: "time", value: e.target.value})
                    }}/><span>&nbsp;小时</span>
                </li>
                <li>
                    <label style = {{verticalAlign: "top"}}>任务内容：</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder = "请输入任务内容" value = {this.state.content} onChange = {e => {
                        this.handleIptChange({type: "content", value: e.target.value})
                    }}></textarea>
                </li>
                <li>
                    <label>任务链接：</label>
                    <input type="text" placeholder = "请输入任务链接" value = {this.state.url} onChange = {e => {
                        this.handleIptChange({type: "url", value: e.target.value})
                    }}/>
                </li>
                <li>
                    <label style = {{verticalAlign: "top"}}>任务二维码：</label>
                    <div id = "output" className = "text-center"><QRCode value = {this.state.url}/></div>
                </li>
                <li style = {{height: "auto"}}>
                    <label>任务截图：</label> 
                    {
                        pic_arr.length > 0 && pic_arr.map(function(pic, i){
                            return <p key = {i} style = {{overflow: "hidden"}}><i style = {{display: "block", float: "left", width: "1.5rem", height: "1.5rem",
                             backgroundImage: "url(" + pic +")", backgroundRepeat: "no-repeat",
                              backgroundSize: "100% 100%", marginLeft: "10%", marginBottom: ".2rem"}}></i>
                             <span style = {{float: "left", fontSize: ".12rem", marginLeft: "1%", marginTop: "10%"}}
                             onClick = {e => {
                                 self.deletePic({index: i})
                             }}>删除图片</span></p>
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
                    <span className = "btn btn_primary" style = {{width: "95%", height: ".6rem", lineHeight: ".6rem"}}
                    onClick = {e => {
                        this.handlePublish()
                    }}>{page_type === "edit_task" ? "修改" : "发布"}</span>
                </li>
            </ul>
            {this.state.warningShow ? 
                <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default PublishTask;