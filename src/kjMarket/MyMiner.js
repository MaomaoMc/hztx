import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class MyMiner extends Component {
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
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Mill/myMillList", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            console.log(res, 'weqe')
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
    useMill (e){  //启用矿机
        const id = e.id;
        const self = this;
        axios.post(window.baseUrl + "/home/Mill/useMill", qs.stringify({
            token: localStorage.getItem("token"),
            id: id
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            self.setState({
                warningShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code})
            })
        })
    }
    componentDidMount (){
        this.ajax()
    }
    render(){
        const data = this.state.data;
        const self = this;
        return <div> 
            <Title title = "我的矿机" code = {this.state.code}/>
            <div className = "pb_100" style = {{ marginTop: ".2rem"}}>
                <ul className = "f_flex kjLists" style = {{backgroundColor: "white"}}>
                    {
                        data.length > 0 && data.map(function(item, i){
                            const status = item.status;
                            const mill  = item.mill;
                            return <li key = {i}>
                                <img src = {window.baseUrl + mill.pic} alt="" style = {{flexGrow: "0"}}/>
                                <div style = {{flexGrow: "2"}}>
                                    <h4 style = {{marginBottom: ".2rem"}}>{mill.name}</h4>
                                    <p><span></span>周期{mill.time}</p>
                                    <p><span></span>总产量{mill.earning}</p>
                                </div>
                                <div style = {{flexGrow: "1", textAlign: "right", marginRight: ".2rem"}}>
                                    <p>产力{mill.force}</p>
                                    {status === "未使用" ? <span className = "btn"
                                    onClick = {e => {
                                        self.useMill({id: item.id})
                                    }}>启用</span> : null}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText}/> : null }
            <Footer />
        </div>
    }
}

export default MyMiner;