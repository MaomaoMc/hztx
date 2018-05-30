import React, { Component } from 'react';
import Title from "./../Title";
import Tab from "./Tab";

const treeImg = require("../img/tree.png");
const tree_icon = require("../img/tree_plus.gif");
const tree_iconLast = require("../img/tree_plusl.gif");
const unionsLists = [
    {
        num: "G486389",
        data: {}
    },
    {
        num: "G692353",
        data: {}
    }
]
class MyUnion extends Component {
    render(){
        return <div> 
            <Title title = "所属工会"/>
           <div style = {{padding: "0 .2rem", marginTop: "1rem"}}>
               <Tab focus = "我的工会"/>
               <div>
                   <img src = {treeImg} alt = "" style = {{verticalAlign: "bottom", marginRight: ".1rem"}}/>
                   <span>G225677 - 人数：2 - 算力： 0.00</span>
               </div>
               {
                   unionsLists.map(function(list, i){
                       console.log(unionsLists.length - 1, i, i !== unionsLists.length - 1 ? tree_icon : tree_iconLast)
                       return <div key = {i} className = "unionsLists">
                        <a><img src={i !== unionsLists.length - 1 ? tree_icon : tree_iconLast} alt=""/></a><span>{list.num}</span>
                       </div>
                   })
               }
           </div>
        </div>
    }
}

export default MyUnion;