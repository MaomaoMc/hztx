import React, { Component } from 'react';
import Title from "./../Title";
import Footer from "./../Footer";

class ContactUs extends Component {
    render(){
        return <div> 
            <Title title = "联系我们"/>
            <div className = "pd_100" style = {{padding: ".2rem .2rem 2rem"}}>
                <h3>内容</h3>
                <textarea name="" id="" cols="30" rows="10" style = {{width: "100%", border: ".01rem solid #ddd", borderRadius: ".1rem"}}></textarea>
                <span className = "btn btn_primary" style = {{width: "100%", height: ".6rem", lineHeight: ".6rem"}}>提交</span>
                <h3>留言记录</h3>
                <table>

                </table>
            </div>
            <Footer />
        </div>
    }
}

export default ContactUs;