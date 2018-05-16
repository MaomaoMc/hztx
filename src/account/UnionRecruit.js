import React, { Component } from 'react';
import Title from "./../Title";
import Footer from "./../Footer";

const recruitImg = require("../img/18351534598.png");
class UnionRecruit extends Component {
    render(){
        return <div> 
            <Title title = "公会招募"/>
            <div className = "pb_100">
                <input type="text" readOnly = "readOnly" value = "http://www.bta014.com/index.php/Home/User/reg/uid/30734.html"
                style = {{width: "99%", border: ".01rem solid #ddd", lineHeight: ".6rem", marginTop: ".3rem", padding: "0 .1rem"}}/>
                <img src = {recruitImg} alt="" style = {{width: "99%", height: "100%", marginTop: "3%"}}/>
            </div>
            <Footer />
        </div>
    }
}

export default UnionRecruit;