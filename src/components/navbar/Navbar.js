import "./Navbar.css";
import React, { BrowserRouter as Router} from 'react-router-dom';
import { BiTask , BiCalendar, BiPhone, BiMailSend, BiBook} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
const Navbar = (props) => {
    const [active, setActive] = useState("/home/calendar");

    const history = useHistory();
    
    const onClick = (route) => {
        history.push(route);
        const page = route.split("/home/").pop();
        setActive(page);
    }

    
    /**
     * Navigation sidebar providing functionality to change app content
     */
    return (<div className="sidenav">
        <Router>
            <ul className="nav-list">
                <li className="nav-item">
                    <button onClick={() => {onClick("/home/tasks")}} className={`nav-button tasks-nav-btn${active === "tasks" ? "-active" : ""}`}>
                        <BiTask className="icon" size={30}/>
                        <h4>Tasks</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {onClick("/home/meetings")}} className={`nav-button meetings-nav-btn${active === "index.html" ? "-active" : ""}`}>
                        <BiPhone className="icon" size={30}/>
                        <h4>Meetings</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {onClick("/home/calendar")}} className={`nav-button calendar-nav-btn${active === "calendar" ? "-active" : ""}`}>
                        <BiCalendar className="icon" size={30}/>
                        <h4>Calendar</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {onClick("/home/inbox")}} className={`nav-button inbox-nav-btn${active === "inbox" ? "-active" : ""}`}>
                        <BiMailSend className="icon" size={30}/>
                        <h4>Inbox</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {onClick("/home/contacts")}} className={`nav-button contacts-nav-btn${active === "contacts" ? "-active" : ""}`}>
                        <BiBook className="icon" size={30}/>
                        <h4>Contacts</h4>
                    </button>
                </li>
            </ul>
        </Router>
    </div>)
}

export default Navbar;