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
class TxWallet extends Component {
    render(){
        return <div className = "pb_100"> 
            <Title title = "提现到区块链钱包"/>
            <div style = {{padding: "0 .2rem"}}>
                <ul className = "f_flex txWalletUl">
                    <li>
                        <span>提现数量:</span>
                        <input type="text" style = {{marginLeft: "3%"}}/><span>枚</span>
                    </li>
                    <li>
                        <span>im钱包收款码:</span>
                        <input type="file" style = {{width: "50%", marginLeft: "3%"}}/>
                    </li>
                    <li>
                        <span>正面身份证上传:</span>
                        <input type="file" style = {{width: "50%", marginLeft: "3%"}}/>
                    </li>
                    <li>
                        <span className = "btn">申请提现</span>
                    </li>
                </ul>
                <p className = "text-center" style = {{color: "red"}}>注意：100个BTA起提，提现到im钱包，30%手续费。</p>
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

export default TxWallet;