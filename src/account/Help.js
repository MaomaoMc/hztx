import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class Help extends Component {
    constructor (props){
        super(props);
        this.state = {
            lists: [],
            index: "",
            warningShow: false,
            warningText: "",
            code: ""
        }
    }
    hanleWarningDlgTimer (){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningShow: false
                })
            }
        , 1000)
    }
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/helplist", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    lists: data.data
                })
            }else{
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
                    code: code
                }, function(){
                    self.hanleWarningDlgTimer();
                })
            }
        })
    }
    handleAccord (e){ //手风琴
        const index = this.state.index;
        const idx = e.index;
        if(idx === index){  //点击已经打开了的 就关闭了去
            this.setState({
                index: null
            })
        }else{
            this.setState({
                index: e.index
            })
        }
    }
    componentDidMount (){
        this.ajax();
        // const accordionA = document.getElementsByTagName("dt");
        // console.log(accordionA[0], 'accordionA')
        // for(var i = 0;i < accordionA.length;i++){
       
        //     accordionA[i].onclick = function(){
        //         console.log(2222)
        //         // accordionA[i].
        //     }
        // }
    }
    render(){
        const self = this;
        const lists = this.state.lists;
        return <div> 
           <Title title = "帮助中心" code = {this.state.code}/>
           <div className = "accordion pb_100">
                <dl>
                    {
                        lists.length > 0 && lists.map(function(list, i){
                            const index = self.state.index;
                            return <div key = {i}>
                                <dt><a className = {self.state.index === i ? "active" : ""} onClick = { e => {
                                    self.handleAccord({index: i})
                                }}>{list.name}</a></dt>
                                <dd className = {index === i ? "accordionItem animateIn" : "accordionItem is-collapsed"}
                                dangerouslySetInnerHTML = {{__html: list.content}}></dd>
                            </div>
                        })
                    }
                </dl>
           </div>
           {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null }
           <Footer />
        </div>
    }
}

export default Help;