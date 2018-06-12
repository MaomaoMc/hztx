import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from './../Title';
import Footer from './../Footer';
import WarningDlg from './../WarningDlg';

class AppDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: "",
            warningShow: false,
            warningText: "",
            code: ""
        }
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
        axios.post(window.baseUrl + "/home/Company/index", qs.stringify({
            token: localStorage.getItem("token")
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
    componentDidMount(){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        console.log(data, 'das')
        return <div> 
            <Title title = "APP下载"/>
            {data.length > 0 ? 
                <div className = "text-center" style = {{marginTop: ".4rem"}}>
                    <p style = {{textAlign: "left", margin: "0 0 .2rem .2rem"}}>下载二维码：</p>
                    <img src={window.baseUrl + data[0].pic} alt="" style = {{width: "4rem", height: "4rem"}}/>
                    <p>{data[0].app}</p>
                </div>
                
            : null}
            <Footer />
        </div>
    }
}

export default AppDown;