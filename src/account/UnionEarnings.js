import React, { Component } from 'react';
import Title from "./../Title";
import Footer from "./../Footer";

const heads = [
    {
        name: "name",
        text: "昵称"
    },
    {
        name: "num",
        text: "编号"
    },
    {
        name: "time",
        text: "运行时间/(h)"
    },
    {
        name: "income",
        text: "收入(BTA)"
    }
]
const mEarnings = [
    {
        name: "微型云矿机",
        num: "H08876534553",
        time: "675",
        income: "0.3423"
    },
    {
        name: "微型云矿机",
        num: "H08876534553",
        time: "675",
        income: "0.3423"
    },
    {
        name: "微型云矿机",
        num: "H08876534553",
        time: "675",
        income: "0.3423"
    },
    {
        name: "微型云矿机",
        num: "H08876534553",
        time: "675",
        income: "0.3423"
    }
]
class UnionEarnings extends Component {
    render(){
        return <div> 
            <Title title = "公会收益"/>
            <div style = {{backgroundColor: "white", marginTop: ".2rem", padding: ".1rem"}}>
                <table className = "normal_table">
                    <thead>
                        <tr>
                            {
                                heads.map(function(head, i){
                                    return <th key = {i} style = {{borderBottom: ".02rem solid #ddd"}}>{head.text}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mEarnings.map(function(item, i){
                                return <tr>
                                    {
                                        heads.map(function(head, i){
                                            return <td key = {i} style = {{borderBottom: ".02rem solid #ddd"}}>{item[head.name]}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                
            </div>
            <Footer />
        </div>
    }
}

export default UnionEarnings;