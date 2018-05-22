import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

const main_kfIcon = require("./../img/main_kf.png");
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            noticeData: [],
            advData: [],
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
    advAjax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Home/adlist", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    advData : data.data
                })
            }else{
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
    noticeAjax(){
        const self = this;
        axios.post(window.baseUrl + "/home/Home/noticelist", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    noticeData : data.data
                })
            }else{
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
        this.advAjax();
        this.noticeAjax();
    }
    render(){
        let settings ={
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidesToScroll:1
        }
        const advData = this.state.advData;
        const noticeData = this.state.noticeData;
        return <div> 
            <Title title = "主页" code = {this.state.code}/>
            <div className = "pb_100">
               <Slider {...settings}>
               {
                   advData.length > 0 && advData.map(function(item, i){
                       return <div key = {i}>
                       <a href = {item.url}>
                            <div style = {{width: "100%", height: "3rem",
                                backgroundImage: "url(" + window.baseUrl + item.pic + ")", 
                                backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
                            </div>
                       </a>
                       </div>
                   })
               }
               </Slider>
               <Link to = "/main/introduce"
                style = {{display: "block", width: "100%", height: "1.75rem",
                 margin: ".5rem 0 .2rem", backgroundImage: "url(" + main_kfIcon + ")",
                  backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
               </Link>
               <div>
                   <div style = {{backgroundColor: "white", borderBottom: ".01rem solid #ddd", padding: ".2rem 0"}}>
                    <h3 style = {{width: "30%", textIndent: ".2rem", color: "#0093fb", borderLeft: ".1rem solid #0093fb"}}>最新公告</h3>
                   </div>
                   <ul className = "noticeUl">
                       {
                           noticeData.length > 0 && noticeData.map(function(item, i){
                               return <li key = {i}>
                                   <Link to = "/main/noticeDetails" onClick = {e => {
                                       localStorage.setItem("noticeDetail", JSON.stringify(item))
                                   }}><div className = "f_lt" style = {{width: "70%"}}>
                                    <h4>{item.name}</h4>
                                    <div dangerouslySetInnerHTML = {{__html: item.content}} style = {{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis"
                                    }}></div>
                                   </div>
                                   <div className = "f_rt">
                                    {new Date(item.add_time * 1000).format("yyyy-MM-dd")}
                                   </div></Link>
                               </li>
                           })
                       }
                   </ul>
               </div>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null}
            <Footer />
            <Footer />
        </div>
    }
}

export default Main;