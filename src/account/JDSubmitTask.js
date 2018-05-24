import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import QRCode from 'qrcode.react';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class JDSubmitTask extends Component {
    constructor (props){
        super(props);
        this.state = {
            id: "", //任务id
            pic_arr: [],
            note: "",  //备注
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
    submit (){  //发布任务
        const self = this;
        const state = this.state;
        axios.post(window.baseUrl + "/home/Jdtask/commitjdTask", qs.stringify({
            token: localStorage.getItem("token"),
            pic : state.pic_arr.join(","),
            id: this.props.match.params.id,
            note: state.note
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
    
    render(){
        const type_arr = this.state.type_arr;
        const pic_arr = this.state.pic_arr;
        return <div> 
            <Title title = "提交任务" code = {this.state.code}/>
            <ul className = "f_flex personalUl pb_100">
                <li style = {{height: "auto"}}>
                    <label>任务截图：</label> 
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
                    <label style = {{verticalAlign: "top"}}>备注：</label>
                    <textarea name="" id="" cols="30" rows="10" onChange = {e => {
                        this.setState({
                            note: e.target.value
                        })
                    }}></textarea>
                </li>
                <li>
                    <span className = "btn btn_primary" style = {{width: "95%", height: ".6rem", lineHeight: ".6rem"}}
                        onClick = {e => {
                            this.submit()
                        }}>提交</span>
                </li>
            </ul>
            {this.state.warningShow ? 
                <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
        </div>
    }
}

export default JDSubmitTask;