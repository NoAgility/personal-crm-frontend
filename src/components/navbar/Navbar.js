import "./Navbar.css";
import { Link } from 'react-router-dom';
import { BiTask , BiCalendar, BiPhone, BiMailSend, BiBook} from 'react-icons/bi';
const Navbar = (props) => {

    /**
     * Replace `/index.html` with other navigation links.
     */
    return (<div className="sidenav">
        <ul className="nav-list">
            <li className="nav-item">
                <Link to={`/index.html`} className="nav-link">
                    <BiTask className="icon" size={32}/>
                    Tasks
                </Link>
            </li>
            <li className="nav-item">
                <Link to={`/index.html`} className="nav-link">
                    <BiPhone className="icon" size={32}/>
                    Meetings
                </Link>
            </li>
            <li className="nav-item">
                <Link to={`/index.html`} className="nav-link">
                    <BiCalendar className="icon" size={32}/>
                    Calendar
                </Link>
            </li>
            <li className="nav-item">
                <Link to={`/index.html`} className="nav-link">
                    <BiMailSend className="icon" size={32}/>
                    Inbox
                </Link>
            </li>
            <li className="nav-item">
                <Link to={`/index.html`} className="nav-link">
                    <BiBook className="icon" size={32}/>
                    Contacts
                </Link>
            </li>
        </ul>
    </div>)
}

export default Navbar;