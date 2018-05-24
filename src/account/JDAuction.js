import React, { Component } from 'react';
import Title from './../Title';
import Footer from './../Footer';

class JDAuction extends Component {
    render(){
        return <div> 
            <Title title = "金豆竞拍"/>
            <p className = "text-center" style = {{marginTop: ".2rem"}}>开发中...</p>
            <Footer />
        </div>
    }
}

export default JDAuction;