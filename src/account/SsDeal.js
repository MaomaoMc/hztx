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
class SsDeal extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: "2018/05/05",
            day: "",
            hour: "",
            minute: "",
            seconds: "",
        }
    }
    countDown (){ //倒计时
        var starttime = new Date(this.state.date);
        const self = this;
        setInterval(function () {
            var nowtime = new Date();
            var time = starttime - nowtime;
            var day = parseInt(time / 1000 / 60 / 60 / 24);
            var hour = parseInt(time / 1000 / 60 / 60 % 24);
            var minute = parseInt(time / 1000 / 60 % 60);
            var seconds = parseInt(time / 1000 % 60);
           self.setState({
                day: day + "天",
                hour: hour + "小时",
                minute: minute + "分钟",
                seconds: seconds + "秒",
           })
        }, 1000);
    }
    componentDidMount (){
        this.countDown();
    }
    render(){
        return <div className = "pb_100"> 
            <Title title = "上市交易"/>
            <div style = {{padding: "0 .2rem"}}>
                <ul className = "f_flex ssDealUl">
                    <li>
                        <span className = "fc_red">BTA第二轮上市众筹申购</span>
                    </li>
                    <li>
                        <span>总量: 200万</span>
                    </li>
                    <li>
                        <span>时间: 2018年5月5日截止</span>
                    </li>
                    <li>
                        <span>倒计时: {this.state.day}{this.state.hour}{this.state.minute}{this.state.seconds}</span>
                    </li>
                    <li>
                        <span>已申购: 234342枚</span>
                    </li>
                    <li>
                        <span>申购:</span><input type="text"/>枚
                    </li>
                    <li>
                        <span>单价: 4元人民币</span>
                    </li>
                    <li>
                        <span className = "btn">提交</span>
                    </li>
                </ul>
                <p className = "text-center" style = {{color: "red"}}>认购后资产转到区块链imToken钱包上市交易，个人资料填写好钱包地址，直推申购获得10%奖金。</p>
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

export default SsDeal;