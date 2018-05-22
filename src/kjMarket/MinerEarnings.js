import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const heads = [
    {
        name: "mill_name",
        text: "矿机名称"
    },
    {
        name: "time",
        text: "运行时间/(h)"
    },
    {
        name: "money",
        text: "收入(BTA)"
    }
]
class MinerEarnings extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            warningShow: false,
            warningText: "",
            code: ""
        }
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningShow: false
                }, function(){
                    if(obj && obj.code === 1){
                        window.location.reload();
                    }
                })
            }
        , 1000)
    }
    ajax(){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/mymill_income", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data
                })
            }else{
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer()
                })
            }
        })
    }
    componentDidMount (){
        this.ajax();
    }
    render(){
        const data = this.state.data;
        return <div> 
            <Title title = "矿机收益" code = {this.state.code}/>
            <div style = {{backgroundColor: "white", marginTop: ".2rem"}}>
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
                            data.length > 0 && data.map(function(item, i){
                                return <tr key = {i}>
                                    {
                                        heads.map(function(head, n){
                                            return <td key = {n} style = {{borderBottom: ".02rem solid #ddd"}}>{item[head.name]}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default MinerEarnings;