import "./Header.css";
import {BiMenu, BiSearch} from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';
import Settings from  "../settings/Settings.js"
import React, { useState } from 'react';

const Header = (props) => {

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="header">

			<div className="search-box">
				<div className="search-button">
					<BiSearch className="search-icon" size={25}/>
				</div>
				<input className="search-input" type="text" />
			</div>

			<div className="menu-dropdown">
			<Dropdown >
				<Dropdown.Toggle id="button-dropdown" className="dropdown-button" align="end">
					<BiMenu className="menu-icon" size={40}/>
				</Dropdown.Toggle>

				<Dropdown.Menu variant="dark">
					<Dropdown.Item onClick={() => setModalShow(true)}>Account</Dropdown.Item>

					<Settings
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>

					<Dropdown.Divider />
					<Dropdown.Item href="/">Log Out</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			</div>
		</div>
	)
}

export default Header;

