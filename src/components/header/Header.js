import "./Header.css";
import {BiMenu, BiSearch} from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';

const Header = (props) => {

	return (
		<div className="header">

			<div className="search-box">
				<div className="search-button">
					<BiSearch className="search-icon" size={35}/>
				</div>
				<input type="text" />
			</div>

			<div className="menu-dropdown">
			<Dropdown >
				<Dropdown.Toggle id="button-dropdown" class="dropdown-button" align="end">
					<BiMenu className="menu-icon" size={40}/>
				</Dropdown.Toggle>

				<Dropdown.Menu variant="dark">
					<Dropdown.Item href="/">Account</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href="/">Log Out</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			</div>
		</div>
	)
}

export default Header;

