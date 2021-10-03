import "./Header.css";
import {BiMenu, BiSearch} from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';
import Settings from  "../settings/Settings"
import AuthService from "../../util/AuthService"
import React, { useState } from 'react';

const Header = (props) => {

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="header">
			<div className="spacer"/>
			<div className="search-box">
				{/* <SearchBar
					data-testid="contact-search"
					name="username"
					colorMode="light"
					width="lg"
					onSubmit=""
					placeholder="Username"
					value=""
					onChange=""
				/> */}
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
					<Dropdown.Item onClick={AuthService.logOut}>Log Out</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			</div>
		</div>
	)
}

export default Header;

