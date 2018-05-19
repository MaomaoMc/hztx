import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from "./../Title";
import Footer from "./../Footer";
import WarningDlg from "./../WarningDlg";

class PersonalData extends Component {
    constructor (props){
        super(props);
        this.state = {
            exitApp: false,
            data: {
                "jd_num": "0",
                "money": "0",
                "dmoney": "0",
            } , //个人信息数据
            warningShow: false,
            warningText: ""
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
        axios.post(window.baseUrl + "/home/Member/member", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data[0]
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
    exitApp (){  //安全退出
        window.removeLocalItemsFun();
        this.setState({
            exitApp: true
        })
    }
    componentDidMount (){
        this.ajax();
    }
    render(){
        if(this.state.exitApp) {
            return (
                <Redirect to="/"/>
            )
        }
        const data = this.state.data;
        return <div className = "pb_100"> 
            <Title title = "个人中心" code = {this.state.code}/>
            <div className = "personal_overview">
                <a className = "exitApp" onClick = {e => {
                    this.exitApp()
                }}>安全退出</a>
                <div>
                    <p className = "text-right" style = {{fontSize: ".24rem"}}>可用JD:&nbsp;{data.jd_num}</p>
                    <p className = "text-right fz_30" style = {{marginTop: ".2rem"}}>{data.money}</p>
                    <p className = "text-right" style = {{fontSize: ".24rem", marginTop: ".2rem"}}>冻结金额:&nbsp;{data.dmoney}</p>
                </div>
            </div>
            <ul className = "f_flex myTasksNav">
                <li><Link to = "/account/myPedTasks" style = {{borderRight: ".01rem solid #ddd"}}><i className = "icon_fashe"></i>发布的任务</Link></li>
                <li><Link to = "/account/myAcceptTasks"><i className = "icon_accept"></i>接受的任务</Link></li>
            </ul>
            <div className="weui_grids">
                <Link to = "/account/myMiner" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                                <path d="M344.112804 426.89981 288.152281 426.89981 131.457496 534.342868 489.614665 534.342868Z" p-id="3630" fill="#f4ea2a"></path>
                                <path d="M820.098565 256.740362c46.364981 0 83.920318-38.058804 83.920318-85.015256 0-46.954405-37.555337-85.014232-83.920318-85.014232-46.346561 0-83.901899 38.058804-83.901899 85.014232C736.196667 218.681558 773.752004 256.740362 820.098565 256.740362z" p-id="3631" fill="#f4ea2a"></path>
                                <path d="M959.69595 568.662511l-27.981285-283.537681L735.847719 285.124829l-55.961546 198.468191-83.944877 85.069491-55.961546 28.352745-5.595438-40.288588L64.303027 556.726667l0 96.994078 27.982308 0 83.942831 141.774981 27.979238 0c3.607154 69.229734 27.478841 142.658094 139.906423 141.78419 87.396489 0 102.219079-63.086827 111.924115-85.078701l55.961546 40.311101 22.38687 0 5.595438-238.791571 27.982308 0 55.961546-56.70549 111.924115-56.703443 39.98262-103.170754 14.97404 134.877897L679.886173 710.436468 713.463919 937.279916l44.7676 0 5.598508-198.490703 83.941807-85.068468 0 113.421212L870.155634 937.279916l67.154469 0-22.3838-201.462385L959.69595 568.662511zM330.123184 880.576473c-38.650275 0-69.953212-31.742958-69.953212-70.91512 0-39.131229 31.30396-70.872141 69.953212-70.872141 38.625716 0 69.953212 31.740912 69.953212 70.872141C400.07742 848.833515 368.749924 880.576473 330.123184 880.576473zM511.998465 852.201216l-55.961546-56.70549 0-28.353768c-0.436952-2.468215 28.504194 2.384303 27.982308 0l27.979238 0L511.998465 852.201216z" p-id="3632" fill="#f4ea2a"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>我的矿机</p>
                </Link>
                <Link to = "/account/mydeal" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                                <path d="M512 0C229.242171 0 0.007239 229.234932 0.007239 512.007239s229.220455 511.992761 511.992761 511.992761S1023.992761 794.8085 1023.992761 512.007239 794.815739 0 512 0z m326.320284 583.699255C804.949909 730.384131 671.62766 840.108241 512.014477 840.108241c-122.797189 0-230.045666-64.931077-288.201326-161.697926v34.745727a19.964316 19.964316 0 0 1-39.914153 0v-137.535169a19.964316 19.964316 0 0 1 39.914153 0C253.361496 705.048706 371.135033 801.830032 512.014477 801.830032S770.638504 705.048706 800.215804 575.649828a19.964316 19.964316 0 0 1 39.914153 0 19.095672 19.095672 0 0 1-1.795196 8.049427z m-441.111479-27.347783v-0.289547a19.312833 19.312833 0 0 1 0-38.611189h77.352674l-82.767216-154.386846h0.115819a24.611556 24.611556 0 1 1 43.5335-21.918763h0.188206S509.611231 479.201482 514.243995 491.015029h0.984462c3.329799-9.482688 75.282408-149.942288 75.282408-149.942289h0.173729a24.872149 24.872149 0 1 1 43.432158 23.163818l-83.201538 153.170746h75.890458a19.312833 19.312833 0 0 1 0 38.611189v0.289547h-89.122789v54.145425h89.06488v0.27507a19.312833 19.312833 0 1 1 0 38.625666v0.260593h-89.06488v77.859383H537.118265a24.264099 24.264099 0 1 1-47.500304 0h-0.521186v-77.801473h-91.873492v-0.260593a19.312833 19.312833 0 1 1 0-38.625667v-0.27507h91.815583v-54.145424h-91.830061z m442.906675-108.015778a19.964316 19.964316 0 0 1-39.914154 0C770.638504 318.907862 652.937354 222.169968 512.014477 222.169968S253.361496 318.907862 223.798674 448.335694a19.964316 19.964316 0 0 1-39.914154 0 19.05224 19.05224 0 0 1 1.809673-8.034949C219.050091 293.572436 352.43025 183.862804 512.014477 183.862804c122.782712 0 230.045666 64.931077 288.201327 161.683449v-34.745727a19.964316 19.964316 0 0 1 39.914153 0z m0 0" p-id="4705" fill="#d81e06"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>我的交易</p>
                </Link>
                <Link to = "/account/minerEarnings" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                                <path d="M775.503904 200.801329l-90.131787 0L685.372118 185.866175c0-15.947204-1.069355-26.317389-3.121084-31.198559-2.051729-4.969175-6.499018-7.396457-13.343913-7.396457-5.520737 0-9.620102 2.137687-12.366655 6.327102-2.742461 4.275373-4.103458 10.601452-4.103458 19.153222 0 14.096043 2.801812 24.00574 8.465812 29.638017 5.487991 5.661953 21.722744 16.642029 48.64593 33.022091 22.87908 13.894452 38.511105 24.495904 46.829562 31.80538 8.290827 7.394411 15.311731 17.765619 21.032012 31.255865 5.720282 13.492292 8.606005 30.27656 8.606005 50.323129 0 32.125675-7.682983 57.371662-23.166629 75.661214-6.731308 7.942903-14.905478 14.557554-24.557302 19.87363-48.414663-9.419534-103.127775-19.587104-158.076248-23.630187-12.5662-16.756639-18.865673-41.97602-18.865673-75.54558l0-17.619286 90.162486 0 0 22.042016c0 24.237007 0.921999 39.257096 2.801812 45.153386 1.849114 5.862521 6.354731 8.750291 13.431917 8.750291 6.095835 0 10.661827-2.048659 13.664208-6.095835 2.950192-4.099365 4.422729-10.225899 4.422729-18.226107 0-20.193925-1.472538-34.695197-4.279467-43.392276-2.797719-8.694009-12.421914-18.22713-28.971845-28.424376-27.530007-17.333784-46.223764-29.987988-56.131415-38.074154-9.851369-8.147564-18.460444-19.50217-25.625634-34.290991-7.249101-14.732539-10.833743-31.373545-10.833743-49.977251 0-26.895557 7.627724-48.041156 22.880103-63.352887 15.251356-15.33936 38.132482-24.786523 68.639287-28.396747L651.510916 64.448848l41.629119 0 0 28.801976c27.845185 3.610224 48.644907 12.913101 62.541405 28.021194 13.81054 15.080463 20.74344 35.994796 20.74344 62.60178C776.428973 187.511651 776.109702 193.231933 775.503904 200.801329L775.503904 200.801329zM78.658989 620.637256l173.212994 338.913896 147.734716-75.513858-29.809933-58.325383 37.928844-59.335387c119.134331 4.246721 191.06764 13.866822 274.960329 3.727904 40.960901-12.046361 263.863596-180.409906 262.648932-208.111828-1.213641-27.733645-32.527834-43.389206-32.527834-43.389206-13.34289 2.39556-102.320387 68.177775-194.327894 96.167247-85.105307 25.886577-164.319439-3.116991-174.370353-61.905932-1.24127-8.118911 130.139989-10.053983 187.284477-9.967002 26.431999-3.496637 40.210817-61.327764 13.950733-66.472947-139.299603-27.182083-331.002716-64.824401-419.513586 58.788941-28.428469 23.689538-57.459666 41.717124-77.449953 52.980655l-21.985734-43.074028L78.658989 620.637256z" p-id="6041" fill="#1296db"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>矿机收益</p>
                </Link>
                <Link to = "/account/personalItems" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M938.670467 1024H85.329533v-213.340633c0-54.590357 20.827184-109.187915 62.493552-150.835082 41.647167-41.656767 96.244725-62.493551 150.835082-62.493552h426.678866c54.599957 0 109.187915 20.827184 150.844682 62.493552 41.647167 41.647167 62.483951 96.244725 62.483952 150.835082v213.340633z" fill="#F05228" p-id="14923"></path>
                            <path d="M511.9988 256.0006m-256.0006 0a256.0006 256.0006 0 1 0 512.0012 0 256.0006 256.0006 0 1 0-512.0012 0Z" fill="#F05228" p-id="14924"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>个人资料</p>
                </Link>
                <Link to = "/account/publishTask" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M938.670467 1024H85.329533v-213.340633c0-54.590357 20.827184-109.187915 62.493552-150.835082 41.647167-41.656767 96.244725-62.493551 150.835082-62.493552h426.678866c54.599957 0 109.187915 20.827184 150.844682 62.493552 41.647167 41.647167 62.483951 96.244725 62.483952 150.835082v213.340633z" fill="#F05228" p-id="14923"></path>
                            <path d="M511.9988 256.0006m-256.0006 0a256.0006 256.0006 0 1 0 512.0012 0 256.0006 256.0006 0 1 0-512.0012 0Z" fill="#F05228" p-id="14924"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>发布任务</p>
                </Link>
                <Link to = "/account/recharge" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M534.686719 873.799636l0.0256 0.0768-0.11264-0.29184c0.02048 0.06656 0.05632 0.13824 0.08704 0.21504l-0.15872-0.36864a246.405108 246.405108 0 0 1-9.08288-23.050239c-0.32768-0.98304-0.67072-1.98144-0.98816-2.979839-0.27648-0.83456-0.53248-1.65376-0.80384-2.50368-0.14848-0.49152-0.3072-0.98816-0.45568-1.49504-0.30208-0.98816-0.60928-1.98656-0.90624-3.00544l-0.573439-2.0224c-0.256-0.83968-0.4864-1.69984-0.72704-2.56a282.270706 282.270706 0 0 1-1.43872-5.5296c-0.19968-0.80896-0.39936-1.6128-0.57856-2.421759-0.01536-0.05632-0.0256-0.11776-0.04608-0.17408a209.71519 209.71519 0 0 1-1.36192-6.05696c-0.128-0.6144-0.26624-1.21856-0.384-1.8432l-0.52736-2.60608-0.44544-2.37056c-0.17408-1.024-0.37888-2.06848-0.53248-3.09248-0.128-0.73216-0.256-1.43872-0.36352-2.175999-0.10752-0.67072-0.22528-1.3312-0.32256-2.00192a124.231674 124.231674 0 0 1-0.34304-2.3552 92.211195 92.211195 0 0 1-0.44032-3.19488 235.335668 235.335668 0 0 1-0.7936-6.67648c-0.08192-0.72704-0.14848-1.45408-0.22016-2.176a210.580469 210.580469 0 0 1-0.42496-5.032959 211.594229 211.594229 0 0 1-0.34816-5.1456c-0.0256-0.4608-0.03584-0.90624-0.06656-1.3568a240.670708 240.670708 0 0 1-0.33792-13.143039h-31.938558v-127.769594H256.455693v-63.882237h223.605749V480.977896H256.455693V417.100779h127.774713L256.455693 257.392627h95.836155l127.774714 159.708152h63.877116l127.774714-159.708152h95.820795l-127.769593 159.708152h127.769593v63.877117h-223.595509v95.836155h54.625278c2.10432-1.85856 4.25472-3.67616 6.435839-5.45792a257.873907 257.873907 0 0 1 8.83712-6.978559l2.26304-1.66912c0.79872-0.60416 1.60256-1.1776 2.41152-1.76128 1.47968-1.05984 2.97472-2.0992 4.474879-3.12832 0.45568-0.32256 0.91648-0.62976 1.3824-0.9472 3.2768-2.2272 6.61504-4.37248 10.00448-6.44096 0.40448-0.256 0.80896-0.49152 1.20832-0.742399 1.36704-0.8192 2.7392-1.62816 4.11136-2.432 0.39936-0.22528 0.80384-0.47104 1.21856-0.69632a244.213748 244.213748 0 0 1 10.583039-5.72928c0.42496-0.22528 0.86016-0.44032 1.29024-0.65536 1.408-0.71168 2.82624-1.40288 4.25472-2.09408 0.44032-0.21504 0.88064-0.43008 1.32096-0.62976a237.086708 237.086708 0 0 1 12.344319-5.4528 235.509748 235.509748 0 0 1 5.7856-2.293759c3.87072-1.4848 7.77728-2.87744 11.740159-4.16256 0.26112-0.1024 0.53248-0.17408 0.78848-0.27136a256.942067 256.942067 0 0 1 25.359359-6.77888c1.92512-0.39424 3.82464-0.78336 5.74976-1.14688 0.95744-0.18432 1.92-0.34816 2.877439-0.52736a301.905905 301.905905 0 0 1 6.3488-1.0496 276.495346 276.495346 0 0 1 11.20256-1.41824l2.954239-0.29696c0.8192-0.08704 1.62816-0.14848 2.45248-0.21504a195.86047 195.86047 0 0 1 6.49216-0.4608c0.7168-0.04608 1.44896-0.09216 2.17088-0.128 2.0736-0.09728 4.1472-0.17408 6.22592-0.23552l0.62976-0.01024a297.395185 297.395185 0 0 1 12.830719 0.01024c2.14016 0.06144 4.25984 0.13824 6.36928 0.25088 0.47104 0.0256 0.9216 0.06144 1.392639 0.09216l2.3296 0.128a231.383028 231.383028 0 0 1 9.98912 0.84992c2.97984 0.31232 5.92384 0.6656 8.857599 1.08032 1.05984 0.15872 2.10944 0.3072 3.16416 0.47104 0.78848 0.11264 1.57696 0.23552 2.36544 0.36864 0.6912 0.10752 1.33632 0.21504 2.00704 0.33792 0.95744 0.14848 1.90464 0.32256 2.87232 0.49664 0.78336 0.15872 1.57696 0.29696 2.3552 0.44032 0.99328 0.19968 1.98144 0.38912 2.97984 0.60416 0.68608 0.13312 1.37728 0.27136 2.048 0.4352a247.905268 247.905268 0 0 1 10.316799 2.41152c1.02912 0.256 2.03264 0.53248 3.05152 0.80384 2.03264 0.54784 4.0448 1.12128 6.05696 1.72032 1.01376 0.30208 2.01216 0.59904 3.010559 0.91648a247.275508 247.275508 0 0 1 13.12768 4.50048c1.08544 0.41984 2.19136 0.82944 3.2768 1.254399 0.8704 0.3328 1.73568 0.67072 2.590719 1.01376 1.3312 0.52736 2.6368 1.0752 3.94752 1.61792a256.906227 256.906227 0 0 1 134.005754 130.421754 508.641255 508.641255 0 0 0 22.645758-150.292473c0-282.373106-228.710389-511.083494-511.068134-511.083494C229.647374 1.85344 0.936986 230.558708 0.936986 512.936934 0.931866 795.28956 229.637134 1023.999949 512 1023.999949a508.405735 508.405735 0 0 0 150.297592-22.640639 256.972787 256.972787 0 0 1-127.610873-127.559674z" p-id="15618" fill="#d4237a"></path>
                            <path d="M959.191018 768.465882c0-105.758715-85.893116-191.65183-191.656951-191.651831s-191.65695 85.887996-191.65695 191.651831c0 105.763835 85.893116 191.65695 191.65695 191.65695s191.65695-85.893116 191.656951-191.65695z m-191.656951 127.774713v-95.836155h-127.769593v-63.882237h127.769593v-95.831035l127.769594 127.769594-127.769594 127.779833z" p-id="15619" fill="#d4237a"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>充值</p>
                </Link>
                <Link to = "/account/txWallet" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M534.686719 873.799636l0.0256 0.0768-0.11264-0.29184c0.02048 0.06656 0.05632 0.13824 0.08704 0.21504l-0.15872-0.36864a246.405108 246.405108 0 0 1-9.08288-23.050239c-0.32768-0.98304-0.67072-1.98144-0.98816-2.979839-0.27648-0.83456-0.53248-1.65376-0.80384-2.50368-0.14848-0.49152-0.3072-0.98816-0.45568-1.49504-0.30208-0.98816-0.60928-1.98656-0.90624-3.00544l-0.573439-2.0224c-0.256-0.83968-0.4864-1.69984-0.72704-2.56a282.270706 282.270706 0 0 1-1.43872-5.5296c-0.19968-0.80896-0.39936-1.6128-0.57856-2.421759-0.01536-0.05632-0.0256-0.11776-0.04608-0.17408a209.71519 209.71519 0 0 1-1.36192-6.05696c-0.128-0.6144-0.26624-1.21856-0.384-1.8432l-0.52736-2.60608-0.44544-2.37056c-0.17408-1.024-0.37888-2.06848-0.53248-3.09248-0.128-0.73216-0.256-1.43872-0.36352-2.175999-0.10752-0.67072-0.22528-1.3312-0.32256-2.00192a124.231674 124.231674 0 0 1-0.34304-2.3552 92.211195 92.211195 0 0 1-0.44032-3.19488 235.335668 235.335668 0 0 1-0.7936-6.67648c-0.08192-0.72704-0.14848-1.45408-0.22016-2.176a210.580469 210.580469 0 0 1-0.42496-5.032959 211.594229 211.594229 0 0 1-0.34816-5.1456c-0.0256-0.4608-0.03584-0.90624-0.06656-1.3568a240.670708 240.670708 0 0 1-0.33792-13.143039h-31.938558v-127.769594H256.455693v-63.882237h223.605749V480.977896H256.455693V417.100779h127.774713L256.455693 257.392627h95.836155l127.774714 159.708152h63.877116l127.774714-159.708152h95.820795l-127.769593 159.708152h127.769593v63.877117h-223.595509v95.836155h54.625278c2.10432-1.85856 4.25472-3.67616 6.435839-5.45792a257.873907 257.873907 0 0 1 8.83712-6.978559l2.26304-1.66912c0.79872-0.60416 1.60256-1.1776 2.41152-1.76128 1.47968-1.05984 2.97472-2.0992 4.474879-3.12832 0.45568-0.32256 0.91648-0.62976 1.3824-0.9472 3.2768-2.2272 6.61504-4.37248 10.00448-6.44096 0.40448-0.256 0.80896-0.49152 1.20832-0.742399 1.36704-0.8192 2.7392-1.62816 4.11136-2.432 0.39936-0.22528 0.80384-0.47104 1.21856-0.69632a244.213748 244.213748 0 0 1 10.583039-5.72928c0.42496-0.22528 0.86016-0.44032 1.29024-0.65536 1.408-0.71168 2.82624-1.40288 4.25472-2.09408 0.44032-0.21504 0.88064-0.43008 1.32096-0.62976a237.086708 237.086708 0 0 1 12.344319-5.4528 235.509748 235.509748 0 0 1 5.7856-2.293759c3.87072-1.4848 7.77728-2.87744 11.740159-4.16256 0.26112-0.1024 0.53248-0.17408 0.78848-0.27136a256.942067 256.942067 0 0 1 25.359359-6.77888c1.92512-0.39424 3.82464-0.78336 5.74976-1.14688 0.95744-0.18432 1.92-0.34816 2.877439-0.52736a301.905905 301.905905 0 0 1 6.3488-1.0496 276.495346 276.495346 0 0 1 11.20256-1.41824l2.954239-0.29696c0.8192-0.08704 1.62816-0.14848 2.45248-0.21504a195.86047 195.86047 0 0 1 6.49216-0.4608c0.7168-0.04608 1.44896-0.09216 2.17088-0.128 2.0736-0.09728 4.1472-0.17408 6.22592-0.23552l0.62976-0.01024a297.395185 297.395185 0 0 1 12.830719 0.01024c2.14016 0.06144 4.25984 0.13824 6.36928 0.25088 0.47104 0.0256 0.9216 0.06144 1.392639 0.09216l2.3296 0.128a231.383028 231.383028 0 0 1 9.98912 0.84992c2.97984 0.31232 5.92384 0.6656 8.857599 1.08032 1.05984 0.15872 2.10944 0.3072 3.16416 0.47104 0.78848 0.11264 1.57696 0.23552 2.36544 0.36864 0.6912 0.10752 1.33632 0.21504 2.00704 0.33792 0.95744 0.14848 1.90464 0.32256 2.87232 0.49664 0.78336 0.15872 1.57696 0.29696 2.3552 0.44032 0.99328 0.19968 1.98144 0.38912 2.97984 0.60416 0.68608 0.13312 1.37728 0.27136 2.048 0.4352a247.905268 247.905268 0 0 1 10.316799 2.41152c1.02912 0.256 2.03264 0.53248 3.05152 0.80384 2.03264 0.54784 4.0448 1.12128 6.05696 1.72032 1.01376 0.30208 2.01216 0.59904 3.010559 0.91648a247.275508 247.275508 0 0 1 13.12768 4.50048c1.08544 0.41984 2.19136 0.82944 3.2768 1.254399 0.8704 0.3328 1.73568 0.67072 2.590719 1.01376 1.3312 0.52736 2.6368 1.0752 3.94752 1.61792a256.906227 256.906227 0 0 1 134.005754 130.421754 508.641255 508.641255 0 0 0 22.645758-150.292473c0-282.373106-228.710389-511.083494-511.068134-511.083494C229.647374 1.85344 0.936986 230.558708 0.936986 512.936934 0.931866 795.28956 229.637134 1023.999949 512 1023.999949a508.405735 508.405735 0 0 0 150.297592-22.640639 256.972787 256.972787 0 0 1-127.610873-127.559674z" p-id="15618" fill="#d4237a"></path>
                            <path d="M959.191018 768.465882c0-105.758715-85.893116-191.65183-191.656951-191.651831s-191.65695 85.887996-191.65695 191.651831c0 105.763835 85.893116 191.65695 191.65695 191.65695s191.65695-85.893116 191.656951-191.65695z m-191.656951 127.774713v-95.836155h-127.769593v-63.882237h127.769593v-95.831035l127.769594 127.769594-127.769594 127.779833z" p-id="15619" fill="#d4237a"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>提现钱包</p>
                </Link>
                <Link to = "/account/spead" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1FACA8" p-id="20270"></path>
                            <path d="M368.172522 420.774957c7.991652 7.43513 17.830957 11.174957 29.428869 11.174956 19.745391 0 33.146435-10.662957 40.225392-31.98887 7.479652-20.390957 16.606609-35.795478 27.425391-46.280347 10.774261-10.48487 27.603478-15.716174 50.487652-15.716174 19.522783 0 35.483826 5.186783 47.816348 15.560348 12.377043 10.395826 18.565565 23.129043 18.565565 38.221913 0 7.746783-2.048 14.914783-6.077217 21.52626a82.988522 82.988522 0 0 1-14.959305 17.964522c-5.921391 5.38713-15.515826 13.356522-28.827826 23.930435-15.181913 12.065391-27.225043 22.483478-36.151652 31.254261s-16.11687 18.988522-21.504 30.586435c-5.409391 11.597913-8.102957 25.33287-8.102956 41.182608 0 12.644174 3.673043 22.171826 11.063652 28.582957 7.368348 6.41113 16.450783 9.638957 27.269565 9.638956 20.791652 0 33.124174-9.794783 37.086609-29.428869 2.31513-9.238261 4.006957-15.716174 5.142261-19.389218 1.135304-3.673043 2.760348-7.368348 4.830608-11.041391s5.231304-7.746783 9.505392-12.176696 9.906087-9.572174 17.007304-15.404521c25.533217-20.769391 43.25287-35.528348 53.136696-44.299131s18.387478-19.18887 25.555478-31.276521c7.145739-12.087652 10.729739-26.156522 10.729739-42.206609 0-20.368696-6.277565-39.268174-18.877217-56.609391-12.55513-17.363478-30.363826-31.076174-53.426087-41.182609-23.062261-10.106435-49.641739-15.159652-79.782957-15.159652-32.411826 0-60.772174 6.032696-85.081043 18.098087-24.30887 12.087652-42.785391 27.336348-55.474087 45.723826-12.666435 18.409739-19.010783 36.59687-19.010783 54.494608 0 8.704 4.006957 16.762435 11.998609 24.219827z m172.499478 313.633391c9.349565-7.546435 14.024348-17.942261 14.024348-31.120696 0-11.887304-4.474435-21.882435-13.401044-30.007652-8.94887-8.102957-19.945739-12.198957-33.03513-12.198957-13.312 0-24.531478 4.096-33.658435 12.198957a38.511304 38.511304 0 0 0-13.712696 30.007652c0 13.401043 4.719304 23.79687 14.180174 31.254261s20.524522 11.197217 33.190957 11.197217c12.265739 0 23.062261-3.784348 32.411826-11.330782z" fill="#FFFFFF" p-id="20271"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>推广</p>
                </Link>
                <Link to = "/account/help" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1FACA8" p-id="20270"></path>
                            <path d="M368.172522 420.774957c7.991652 7.43513 17.830957 11.174957 29.428869 11.174956 19.745391 0 33.146435-10.662957 40.225392-31.98887 7.479652-20.390957 16.606609-35.795478 27.425391-46.280347 10.774261-10.48487 27.603478-15.716174 50.487652-15.716174 19.522783 0 35.483826 5.186783 47.816348 15.560348 12.377043 10.395826 18.565565 23.129043 18.565565 38.221913 0 7.746783-2.048 14.914783-6.077217 21.52626a82.988522 82.988522 0 0 1-14.959305 17.964522c-5.921391 5.38713-15.515826 13.356522-28.827826 23.930435-15.181913 12.065391-27.225043 22.483478-36.151652 31.254261s-16.11687 18.988522-21.504 30.586435c-5.409391 11.597913-8.102957 25.33287-8.102956 41.182608 0 12.644174 3.673043 22.171826 11.063652 28.582957 7.368348 6.41113 16.450783 9.638957 27.269565 9.638956 20.791652 0 33.124174-9.794783 37.086609-29.428869 2.31513-9.238261 4.006957-15.716174 5.142261-19.389218 1.135304-3.673043 2.760348-7.368348 4.830608-11.041391s5.231304-7.746783 9.505392-12.176696 9.906087-9.572174 17.007304-15.404521c25.533217-20.769391 43.25287-35.528348 53.136696-44.299131s18.387478-19.18887 25.555478-31.276521c7.145739-12.087652 10.729739-26.156522 10.729739-42.206609 0-20.368696-6.277565-39.268174-18.877217-56.609391-12.55513-17.363478-30.363826-31.076174-53.426087-41.182609-23.062261-10.106435-49.641739-15.159652-79.782957-15.159652-32.411826 0-60.772174 6.032696-85.081043 18.098087-24.30887 12.087652-42.785391 27.336348-55.474087 45.723826-12.666435 18.409739-19.010783 36.59687-19.010783 54.494608 0 8.704 4.006957 16.762435 11.998609 24.219827z m172.499478 313.633391c9.349565-7.546435 14.024348-17.942261 14.024348-31.120696 0-11.887304-4.474435-21.882435-13.401044-30.007652-8.94887-8.102957-19.945739-12.198957-33.03513-12.198957-13.312 0-24.531478 4.096-33.658435 12.198957a38.511304 38.511304 0 0 0-13.712696 30.007652c0 13.401043 4.719304 23.79687 14.180174 31.254261s20.524522 11.197217 33.190957 11.197217c12.265739 0 23.062261-3.784348 32.411826-11.330782z" fill="#FFFFFF" p-id="20271"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>帮助中心</p>
                </Link>
                <Link to = "/account/pwdControl" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                                <path d="M767.9 385.1H259c-35 0-63.6 27.9-63.6 62v413.3c0 34.1 28.6 62 63.6 62h508.9c35 0 63.6-27.9 63.6-62V447c0-34.1-28.6-61.9-63.6-61.9z m-207 287.5v66.8c0 25.5-21.3 46.3-47.5 46.3s-47.5-20.8-47.5-46.3v-66.8c-23.1-15.3-37.3-40.9-37.3-68.3 0-45.6 38-82.7 84.8-82.7s84.8 37.1 84.8 82.7c0.1 27.5-14.2 53-37.3 68.3z" fill="#F7D856" p-id="24394"></path>
                                <path d="M511.9 512.3c-49.4 0-89.5 40.2-89.5 89.5 0 29.7 15 57.4 39.4 74v72.3c0 27.6 22.5 50.1 50.1 50.1s50.1-22.5 50.1-50.1v-72.3c24.4-16.6 39.4-44.3 39.4-74 0.1-49.4-40.1-89.5-89.5-89.5z m33.4 147.8c-4.1 2.3-6.1 6.8-5.5 11.2 0 0.2-0.1 0.4-0.1 0.6v76.2c0 15.3-12.4 27.7-27.7 27.7s-27.7-12.4-27.7-27.7v-76.2c0-0.2-0.1-0.4-0.1-0.6 0.6-4.4-1.4-8.9-5.5-11.2-20.8-12-33.8-34.3-33.8-58.3 0-37 30.1-67.1 67.1-67.1s67.1 30.1 67.1 67.1c0 24-13 46.3-33.8 58.3z" fill="#292C3C" p-id="24395"></path>
                                <path d="M780.5 378h-55.1v-81.3C725.4 161.9 635.6 64 511.9 64s-213.5 97.9-213.5 232.7V378h-55.1c-36.9 0-67.1 30.2-67.1 67.1v447.7c0 36.9 30.2 67.1 67.1 67.1h537.2c36.9 0 67.1-30.2 67.1-67.1V445.1c0.1-36.9-30.1-67.1-67.1-67.1z m-437.3-81.3c0-110.7 69.4-188 168.7-188s168.7 77.3 168.7 188V378H343.2v-81.3z m459.7 596.1c0 12.1-10.3 22.4-22.4 22.4H243.3c-12.1 0-22.4-10.3-22.4-22.4V445.1c0-12.1 10.3-22.4 22.4-22.4h537.2c12.1 0 22.4 10.3 22.4 22.4v447.7z" fill="#292C3C" p-id="24396"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>密码管理</p>
                </Link>
                <Link to = "/account/contactUs" className="weui_grid js_grid" data-id="toast">
                    <div className="weui_grid_icon">
                        <i className="iconfont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" aria-labelledby="title">
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF7D7D" p-id="30572"></path>
                            <path d="M528.62976 750.91968c3.15392 0 6.30784-0.2048 9.54368-0.65536 30.9248-4.38272 57.1392-29.94176 66.88768-65.08544 0.73728-2.6624-0.36864-5.44768-2.41664-6.59456-2.08896-1.18784-4.66944-0.12288-5.85728 2.2528-0.08192 0.2048-12.45184 23.63392-60.2112 31.3344a126.976 126.976 0 0 1-20.72576 1.72032c-33.54624 0-48.49664-14.90944-48.57856-15.11424a4.01408 4.01408 0 0 0-5.9392-0.12288 6.22592 6.22592 0 0 0-0.98304 7.04512c14.58176 27.77088 40.71424 45.21984 68.28032 45.21984z" fill="#FFFFFF" p-id="30573"></path>
                            <path d="M772.25984 420.29056l-1.14688 0.08192C743.30112 296.87808 636.96896 204.8 509.66528 204.8c-130.90816 0-239.53408 97.19808-263.65952 225.77152A51.2 51.2 0 0 0 204.8 481.52576v102.15424c0 28.59008 22.36416 51.89632 50.05312 51.89632a49.152 49.152 0 0 0 38.54336-19.16928 236.17536 236.17536 0 0 0 124.19072 133.98016c0.16384-0.28672 1.26976-2.4576 2.49856-4.21888 0.90112-1.18784 1.88416-2.21184 2.78528-2.21184 0.90112 0 1.67936 0.36864 2.41664 0.8192-13.23008-10.07616-60.86656-61.89056-71.14752-134.144-4.54656-31.82592 18.67776-62.99648 45.79328-68.23936 43.45856-8.23296 86.6304-17.69472 130.08896-25.84576 27.60704-5.12 46.4896-20.72576 58.04032-46.57152 2.6624-6.06208 6.63552-18.2272 8.3968-35.84a5.40672 5.40672 0 0 1 5.28384-4.66944c1.80224 0 3.31776 0.90112 4.3008 2.29376l1.14688-0.73728c17.08032 25.47712 51.03616 81.96096 55.95136 141.47584 5.65248 68.03456 2.49856 114.60608-48.29184 162.28352-0.08192 0.08192-0.16384 0.08192-0.16384 0.16384a4.58752 4.58752 0 0 0-1.14688 2.94912c0 1.47456 0.8192 2.74432 1.88416 3.4816l1.26976 0.53248c0.36864 0.08192 0.6144 0.16384 0.98304 0.16384 0.36864 0 0.6144-0.08192 0.98304-0.16384l2.12992-1.18784a237.32224 237.32224 0 0 0 108.99456-135.70048c7.33184 11.18208 18.88256 19.33312 32.27648 22.1184-21.46304 100.31104-108.70784 163.0208-216.71936 172.56448a44.15488 44.15488 0 0 0-85.36064 16.13824 44.2368 44.2368 0 0 0 44.2368 44.27776c19.6608 0 36.20864-13.02528 41.94304-30.80192 125.09184-10.4448 225.32096-86.67136 246.21056-205.12768 18.51392-7.90528 31.45728-26.50112 31.45728-48.25088v-103.424a52.10112 52.10112 0 0 0-51.56864-52.224z m-46.12096 29.61408c-32.64512-90.60352-117.10464-155.32032-216.55552-155.32032-99.04128 0-183.17312 64.18432-216.18688 154.2144a54.14912 54.14912 0 0 0-5.44768-5.61152c18.59584-109.7728 110.67392-193.1264 221.71648-193.1264 110.51008 0 202.21952 82.61632 221.55264 191.56992-1.96608 2.58048-3.6864 5.3248-5.07904 8.27392z" fill="#FFFFFF" p-id="30574"></path>
                            </svg>
                        </i>
                    </div>
                    <p className="weui_grid_label" style={{marginTop: ".24rem"}}>联系我们</p>
                </Link>
            </div>
            {this.state.warningShow ? <WarningDlg text = {this.state.warningText} /> : null}
            <Footer />
        </div>
    }
}

export default PersonalData;