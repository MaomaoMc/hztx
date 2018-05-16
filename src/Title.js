import React, { Component } from 'react';
// import './css/common.css';
import {Link, Redirect} from 'react-router-dom';

class Title extends Component {
    render(){
        if(this.props.code > 10000){  //token过期 回登陆页面去
            window.removeLocalItemsFun()
            return <Redirect to = "/" />
        }
        return <div> 
           <header>
               <span className = "f_lt">
                   <a onClick = {e => {
                       window.history.go(-1)
                   }}><i className = "arrow_l"></i></a>
               </span>
               <span>{this.props.title}</span>
               <span className = "f_rt">
                   <Link to = "/account/personalData"><i className = "icon_user"></i></Link>
               </span>
           </header>
        </div>
    }
}

export default Title;