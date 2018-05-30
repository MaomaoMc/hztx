import React, { Component } from 'react';
import Title from "./../Title";
import Footer from "./../Footer";

class NoticeDetail extends Component {
    render(){
        const noticeDetail = JSON.parse(localStorage.getItem("noticeDetail"));
        return <div> 
            <Title title = "公告详情"/>
            <div className = "taskDetail">
                <h3 className = "text-center">{noticeDetail.name}</h3>
                <div style = {{padding: ".2rem .3rem"}}>
                    <span className = "f_rt">{new Date(noticeDetail.add_time * 1000).format("yyyy-MM-dd")}</span>
                    <p style = {{marginTop: ".8rem", textIndent: ".3rem", lineHeight: ".4rem"}} dangerouslySetInnerHTML = {{__html: noticeDetail.content}}></p>
                </div>
            </div>
            <Footer />
        </div>
    }
}

export default NoticeDetail;