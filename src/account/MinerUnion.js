import React, { Component } from 'react';
import Title from "./../Title";
import Tab from "./Tab";

class MinerUnion extends Component {
    render(){
        return <div> 
            <Title title = "所属工会"/>
           <div style = {{padding: "0 .2rem", marginTop: "1rem"}}>
                <Tab focus = "所属工会"/>
               <p className = "text-center">新注册会员请联系公会会长免费领取矿机</p>
               <ul className = "f_flex unionUl">
                   <li>
                    <label className = "span_label">公会名称:</label><span>BTA大富豪公会</span>
                   </li>
                   <li>
                    <label className = "span_label">公会宣言:</label><span>通知：2018年4月28日 20:00荔枝微信课堂会议。
食指和中指向天！我要成为大富豪！
【区块链钱包下载：https://token.im】</span>
                   </li>
                   <li>
                    <label className = "span_label">公会QQ群:</label><span>480073391</span>
                   </li>
                   <li>
                    <label className = "span_label">会长微信:</label><span>微信qq11111ggg 加审核员领矿机</span>
                   </li>
                   <li>
                    <label className = "span_label">会长QQ:</label><span>微信qq11111ggg 加审核员领矿机</span>
                   </li>
                   <li>
                    <label className = "span_label">会长手机:</label><span>微信qq11111ggg 加审核员领矿机</span>
                   </li>
               </ul>
           </div>
        </div>
    }
}

export default MinerUnion;