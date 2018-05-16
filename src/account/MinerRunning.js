import React, { Component } from 'react';
import Title from "./../Title";

const circleImg = require("../img/circle.png");
class MinerRunning extends Component {
    constructor (props){
        super(props);
        this.state = {
            drGEC_val: "0.16728637547",
            ljGEC_val: "8.7086476723"
        }
    }
    renderBackground (){
        var matrix=document.getElementById("matrix");
        var context=matrix.getContext("2d");
        matrix.height=window.innerHeight;
        matrix.width=window.innerWidth;
        var drop=[];
        var font_size=16;
        var columns=matrix.width/font_size;
        for(var i=0;i<columns;i++)
            drop[i]=1;
    
        function drawMatrix(){
    
            context.fillStyle="rgba(0, 0, 0, 0.1)";
            context.fillRect(0,0,matrix.width,matrix.height);
    
            context.fillStyle="green";
            context.font=font_size+"px";
            for(var i=0;i<columns;i++){
                context.fillText(Math.floor(Math.random()*2),i*font_size,drop[i]*font_size);/*get 0 and 1*/
    
                if(drop[i]*font_size>(matrix.height*2/3)&&Math.random()>0.85)/*reset*/
                    drop[i]=0;
                drop[i]++;
            }
        }
        setInterval(drawMatrix,40);
    }
    renderRunning (){
        const self = this;
        var i = parseFloat(document.getElementById("drGEC").innerHTML);
        var max = parseFloat(i+(0.00000424));
        var time1 = setInterval(function() {
            var time2 = setInterval(function(){
                i = parseFloat((i+0.000222).toFixed(8));
                console.log(i);
                if(i >= max){
                    clearInterval(time2);
                    i = max;
                }
                self.setState({
                    drGEC_val: i.toFixed(8)
                })
            },10);
            max = i + (0.00000424);
            self.setState({
                drGEC_val: i
            })
        }, 5000);
        var s=parseFloat(document.getElementById("ljGEC").innerHTML);
        var time2=setInterval(function() {
            console.log(s);
            s=parseFloat((s+(0.00000424)).toFixed(8));
            self.setState({
                ljGEC_val: s.toFixed(8)
            })
        }, 5000);
    }
    componentDidMount (){  
       this.renderBackground();//二进制  刷刷刷的 
       this.renderRunning(); //运行中  的效果
    }
    render(){
        return <div> 
            <Title title = "运行"/>
            <canvas id="matrix" style = {{position: "absolute", zIndex : "-1", "width": "100%", "height": "100%"}} height="667" width="375"></canvas>
            <div className = "kj_running">
                <p className = "fc_white">我的：微型云矿机</p>
                <div style = {{position: "relative", width: "100%", height: "100vw", textAlign: "center"}}>
                    <img className = "loading" src = {circleImg} alt=""/>
                    <p className = "kj_text">运行中</p>
                </div>
                <div className = "kj_runningDetails">
                    <p><span className = "fc_white" id = "drGEC" style = {{fontSize: ".6rem"}}>{this.state.drGEC_val}</span>&nbsp;&nbsp;&nbsp;BTA</p>
                    <p className = "fc_white" style = {{fontSize: ".4rem"}}>我的算力：0.01 GH/S</p>
                    <p className = "fc_white" style = {{fontSize: ".3rem"}}>累计获取：<span id = "ljGEC">{this.state.ljGEC_val}</span> GH/S</p>
                    <p className = "fc_white" style = {{fontSize: ".2rem"}}>全网算力：534.01 GH/S</p>
                </div>
            </div>
        </div>
    }
}

export default MinerRunning;