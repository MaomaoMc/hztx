import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";

class Introduce extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {title: "",
             content: "",
                qq1: "",
                qq2: "",
                qq3: "",
                qq4: ""
            },
            warningShow: false,
            warningText: ""
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
                    data: data.data[0]
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
        return <div> 
            <Title title = "公司简介" code = {this.state.code}/>
            <div className = "taskDetail">
                <h3 className = "text-center">{data.title}</h3>
                <div style = {{padding: ".2rem .3rem"}}>
                   <p>{data.content}</p>
                   <p>QQ1: {data.qq1}</p>
                   <p>QQ2: {data.qq2}</p>
                   <p>QQ3: {data.qq3}</p>
                   <p>QQ4: {data.qq4}</p>
                </div>
            </div>
            <Footer />
        </div>
    }
}

export default Introduce;