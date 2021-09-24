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
                    <button onClick={() => {history.push("/home/tasks")}} className="nav-button">
                        <BiTask className="icon" size={32}/>
                        Tasks
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/index.html")}} className="nav-button">
                        <BiPhone className="icon" size={32}/>
                        Meetings
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/calendar")}} className="nav-button">
                        <BiCalendar className="icon" size={32}/>
                        Calendar
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("index.html")}} className="nav-button">
                        <BiMailSend className="icon" size={32}/>
                        Inbox
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => {history.push("/home/contacts")}} className="nav-button">
                        <BiBook className="icon" size={32}/>
                        Contacts
                    </button>
                </li>
            </ul>
        </Router>
    </div>)
}

export default Navbar;