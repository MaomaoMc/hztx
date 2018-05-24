import React, { Component } from 'react';
import Title from './../Title';
import Footer from './../Footer';

class BusinessCoop extends Component {
    render(){
        return <div> 
            <Title title = "商务合作"/>
            <p className = "text-center" style = {{marginTop: ".2rem"}}>开发中...</p>
            <Footer />
        </div>
    }
}

export default BusinessCoop;