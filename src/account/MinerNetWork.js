import React, { Component } from 'react';
import Title from "./../Title";
import Tab from "./Tab";

const lists = [
    {
        name: "G692352",
        weChat: "150525067233",
        phone: "150554825654"
    },
    {
        name: "G692232",
        weChat: "150525067233",
        phone: " "
    },
    {
        name: "G9267543",
        weChat: "150525067233",
        phone: " "
    }
]
class MinerNetWork extends Component {
    render(){
        return <div> 
            <Title title = "所属工会"/>
           <div style = {{padding: "0 .2rem", marginTop: "1rem"}}>
               <Tab focus = "矿机网络"/>
               <div className = "minerNetWorkDiv f_flex">
                   <ul>
                       <li>昵称</li>
                       <li>微信</li>
                       <li>手机</li>
                   </ul>
                   {
                    lists.map(function(list, i){
                        return <ul key = {i}>
                            <li><span>{list.name}</span></li>
                            <li><span>{list.weChat}</span></li>
                            <li><span>{list.phone}</span></li>
                        </ul>
                    })
                }
               </div>
           </div>
        </div>
    }
}

export default MinerNetWork;