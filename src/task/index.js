import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './../css/account.css';
import Nav from "./../Nav";
import TaskHall from './TaskHall';
import PublishTask from './PublishTask';
import MyPedTasks from './MyPedTasks';
import MyAcceptTasks from './MyAcceptTasks';

const task_nav = [
    {
        text: "任务大厅",
        link: "/task",
    },
    {
        text: "发布任务",
        link: "/task/publishTask"
    },
    {
        text: "我发布的任务",
        link: "/task/myPedTasks"
    },
    {
        text: "我接受的任务",
        link: "/task/myAcceptTasks"
    }
]
class Task extends Component {
    render(){
        return <div> 
            <Nav nav = {JSON.stringify(task_nav)}/>
            <Switch>
                <Route path="/task/publishTask" component = {PublishTask} />
                <Route path="/task/myPedTasks" component = {MyPedTasks} />
                <Route path="/task/myAcceptTasks" component = {MyAcceptTasks} />
                <Route path="/task" component = {TaskHall} />
            </Switch>
        </div>
    }
}

export default Task;