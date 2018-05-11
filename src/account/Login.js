import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './../css/account.css';
import './../css/common.css';

const loginImg = require("../img/logo.jpg");
class Login extends Component {
    render(){
        return <div> 
            <img src={loginImg} alt="" style={{width: "36%", marginLeft: "32%", marginTop: ".5rem", marginBottom: ".5rem"}}/>
            <div>
                <form action="" id="loginFrom" className = "loginFrom">
                    <ul>
                        <li style = {{borderBottom: ".02rem solid #e5e5e5"}}>
                            {/* <div> */}
                                <span><i></i></span>
                                {/* <span> */}
                                    <input type="text" className = "input-txt" placeholder = "请输入会员账号"/>
                                {/* </span> */}
                            {/* </div> */}
                        </li>
                        <li>
                            {/* <div> */}
                                <span><i></i></span>
                                {/* <span> */}
                                    <input type="text" className = "input-txt" placeholder = "请输入登录密码"/>
                                {/* </span> */}
                            {/* </div> */}
                        </li>
                    </ul>
                    <div style = {{padding: '0 .3rem'}}>
                        <button className = "submit"><Link to = "/account/minerUnion">登录</Link></button>
                        <p style = {{color: "#f04447", textAlign: "right"}}>忘记密码</p>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default Login;