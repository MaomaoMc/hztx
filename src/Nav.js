import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        const nav = JSON.parse(this.props.nav);
        const hash = window.location.hash.substring(1);
        return <div> 
           <ul className = "head_nav f_flex">
            {
                nav.map(function(item, i){
                    return <li key = {i} className = {hash === item.link? "active" : ""}>
                        <Link to = {item.link}>{item.text}</Link>
                    </li>
                })
            }
           </ul>
        </div>
    }
}

export default Nav;