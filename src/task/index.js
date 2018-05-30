import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './../css/account.css';
import Nav from "./../Nav";
import TaskHall from './TaskHall';
import PublishTask from './PublishTask';
import MyPedTasks from './MyPedTasks';
import MyAcceptTasks from './MyAcceptTasks';
import SubmitTask from './SubmitTask';
import ExamineTask from './ExamineTask';
import TaskDetail from './TaskDetail';
import ShenheTask from './ShenheTask';

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
        const hash = window.location.hash;
        return <div>  
            {hash.indexOf("submitTask") === -1 && hash.indexOf("taskDetail") === -1 &&
             hash.indexOf("examineTask") === -1 && hash.indexOf("shenheTask") === -1
              && hash.indexOf("jdTask") === -1 && hash.indexOf("editTask") === -1  ?
             <Nav nav = {JSON.stringify(task_nav)}/> : null}
            <Switch>
                <Route path="/task/publishTask/:id" component = {PublishTask} />
                <Route path="/task/publishTask" component = {PublishTask} />
                <Route path="/task/taskDetail/:id" component = {TaskDetail} />
                <Route path="/task/myPedTasks" component = {MyPedTasks} />
                <Route path="/task/myAcceptTasks" component = {MyAcceptTasks} />
                <Route path="/task/examineTask/:id" component = {ExamineTask} />
                <Route path="/task/shenheTask/:id" component = {ShenheTask} />
                <Route path="/task/submitTask/:id" component = {SubmitTask} />
                <Route path="/task" component = {TaskHall} />
            </Switch>
        </div>
    }
}

export default Task;