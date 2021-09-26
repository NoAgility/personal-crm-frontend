import "./Navbar.css";
import React, { BrowserRouter as Router} from 'react-router-dom';
import { BiTask , BiCalendar, BiPhone, BiMailSend, BiBook} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
const Navbar = (props) => {

    const history = useHistory();
    /**
     * Replace `/index.html` with other navigation buttons.
     */
    return (<div className="sidenav">
        <Router>
            <ul className="nav-list">
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/tasks")}} className="nav-button tasks-nav-btn">
                        <BiTask className="icon" size={30}/>
                        <h4>Tasks</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/index.html")}} className="nav-button meetings-nav-btn">
                        <BiPhone className="icon" size={30}/>
                        <h4>Meetings</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/calendar")}} className="nav-button calendar-nav-btn">
                        <BiCalendar className="icon" size={30}/>
                        <h4>Calendar</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/inbox")}} className="nav-button inbox-nav-btn">
                        <BiMailSend className="icon" size={30}/>
                        <h4>Inbox</h4>
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/contacts")}} className="nav-button contacts-nav-btn">
                        <BiBook className="icon" size={30}/>
                        <h4>Contacts</h4>
                    </button>
                </li>
            </ul>
        </Router>
    </div>)
}

export default Navbar;