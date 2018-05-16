import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const tabs = [
    {
        text: "我的工会",
        link: "/account/myUnion"
    },
    {
        text: "矿机网络",
        link: "/account/minerNetWork"
    },
    {
        text: "所属工会",
        link: "/account/minerUnion"
    },
    {
        text: "工会管理",
        link: "/account/minerUnion"
    }
]
class Tab extends Component {
    render(){
        const self = this;
        return <div> 
           <ul className = "unionTabUl f_flex">
               {
                   tabs.map(function(tab, i){
                       const text = tab.text;
                       return <li key = {i} className = {text === self.props.focus ? "active" : ""}>
                        <Link  to = {tab.link}>{text}</Link>
                       </li>
                   })
               }
           </ul>
        </div>
    }
}

export default Tab;