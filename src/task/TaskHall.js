import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

const taskNav = [
    {
        text: "单价",
        value: "money"
    },
    {
        text: "新增",
        value: "add_time"
    },
    {
        text: "推广",
        value: "tuiguang",
    },
    {
        text: "vip",
        value: "vip"
    }
]
class TaskHall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_arr: [],
            page: 1,
            pageSize: 6,
            total: 0,  //总条数
            pageTotal: 0,  //总页数
            page_arr: [],
            taskclass_id: "",
            order: "money",  //排序方式 单价传值 money 新增传值 add_time 推广传值tuiguang
            taskIndex: 0,
            taskLists: [],
            warningShow: false,
            warningText: ""
        }
    }
    hanleWarningDlgTimer() {
        const self = this;
        setTimeout(
            function () {
                self.setState({
                    warningShow: false
                })
            }
            , 1000)
    }
    handleTabIndex(e) {
        this.setState({
            taskIndex: e.index,
            order: e.order
        }, function () {
            this.getTaskListAjax()
        })
    }
    handleChangeType(e) {
        this.setState({
            taskclass_id: e.id
        }, function () {
            this.getTaskListAjax()
        })
    }
    ajax() {
        const self = this;
        axios.post(window.baseUrl + "/home/Member/getTaskclass", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function (res) {
            const data = res.data;
            const code = data.code;
            if (code === 1) {
                const lists = data.data;
                const total = lists.length;
                const pageTotal = Math.ceil(total / self.state.pageSize);
                let page_arr = self.state.page_arr;
                for (var i = 0; i < pageTotal; i++) {
                    page_arr.push(i)
                }
                self.setState({
                    type_arr: lists,
                    total: total,
                    pageTotal: pageTotal,
                    page_arr: page_arr,
                    taskclass_id: lists[0].id
                }, function () {
                    self.getTaskListAjax()
                })
            } else {
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
                    code: code
                }, function () {
                    self.hanleWarningDlgTimer()
                })
            }
        })
    }
    getTaskListAjax() {
        const self = this;
        axios.post(window.baseUrl + "/home/Member/taskList", qs.stringify({
            token: localStorage.getItem("token"),
            taskclass_id: self.state.taskclass_id,
            order: self.state.order
        })).then(function (res) {
            const data = res.data;
            const code = data.code;
            if (code === 1) {
                self.setState({
                    taskLists: data.data
                })
            } else {
                self.setState({
                    warningShow: true,
                    warningText: data.msg,
                    code: code
                }, function () {
                    self.hanleWarningDlgTimer()
                })
            }
        })
    }
    getRows() {
        var page = this.state.page,    //页码
            pageSize = this.state.pageSize,  //每页显示多少条
            rows = this.state.type_arr;
        return rows.slice((page - 1) * pageSize, page * pageSize);
    }
    handlePaging(e) {  //翻页
        this.setState({
            page: e.page
        })
    }
    componentDidMount() {
        this.ajax();
    }
    render() {
        const self = this;
        const taskLists = this.state.taskLists;
        return <div>
            <Title title="任务中心" code = {this.state.code}/>
            <div className="pb_100">
                <div className="weui_grids">
                    {
                        this.getRows().map(function (item, i) {
                            return <a className="weui_grid js_grid" key={i} onClick={e => {
                                self.handleChangeType({ id: item.id })
                            }}>
                                <div className="weui_grid_icon" style={{ backgroundImage: "url(" + window.baseUrl + item.pic + ")", backgroundSize: "100% 100%" }}></div>
                                <p className="weui_grid_label" style={{ marginTop: ".24rem" }}>{item.name}</p>
                            </a>
                        })
                    }
                </div>
                {this.state.pageTotal > 1 ? <div className="carousel">
                    {this.state.page_arr.map(function (page, i) {
                        return <span key={i} className={self.state.page - 1 === i ? "active" : ""}
                            onClick={e => {
                                self.handlePaging({ page: i + 1 })
                            }}></span>
                    })}
                </div> : null}
                <ul className="taskNav f_flex">
                    {
                        taskNav.map(function (item, i) {
                            return <li key={i} className={self.state.taskIndex === i ? "active" : ""}
                                onClick={e => {
                                    self.handleTabIndex({ index: i, order: item.value })
                                }}>
                                <a>{item.text}</a>
                            </li>
                        })
                    }
                </ul>
                <ul className="taskLists f_flex">
                    {
                        taskLists.length === 0 ? <li>暂时没有数据可显示...</li> :
                            taskLists.length > 0 && taskLists.map(function (list, i) {
                                return <li key={i}>
                                    <Link to = {"/task/taskDetail/" + list.id}>
                                    <img className="f_lt" src={list.pic} alt="" />
                                        <div className="f_lt">
                                            <h4>{list.title}</h4>
                                            <p style={{ fontSize: ".24rem", color: "#666", marginTop: ".1rem" }}>赚{list.count} 接{list.ynum} 剩{list.leftover}</p>
                                        </div>
                                        <div className="f_rt">
                                            <p className="fc_red"><span className="icon">赏</span><span>{list.money}元</span></p>
                                            <p style={{ fontSize: ".24rem", color: "#666", marginTop: ".1rem" }}>{list.add_time}</p>
                                        </div></Link>
                                </li>
                            })
                    }
                </ul>
            </div>
            {this.state.warningShow ? <WarningDlg text={this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default TaskHall;