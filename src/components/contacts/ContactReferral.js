import React, { useEffect, useState, useRef } from 'react';
import { Dropdown, Popover, OverlayTrigger  } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import ClipboardJS from "clipboard";
import SearchBar from '../UIComponents/searchbar/SearchBar';
import "./ContactReferral.css"
import ContactController from './ContactController';
import CookieManager from '../../util/CookieManager';


function ContactReferral({ link }) {

	const [username, setUsername] = useState("");
	const [show, setShow] = useState(false);


	new ClipboardJS(".clip-btn");

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>
				Link Copied!
			</Popover.Body>
		</Popover>
	);

	const toggleShow = () => {
		setShow(true);
		setTimeout(function() {
			setShow(false);
		}, 1000);
	}

	// Get the user's username
	useEffect(() => {
		const getUsername = async () => {
			const u = await ContactController.fetchUserByID(parseInt(CookieManager.getCookie('accountID')));
			if (u !== undefined) { setUsername(u.accountUsername); }
		}
		getUsername();
	}, [])

	return (
		<>
		<Dropdown className="dropdown-small referral-dropdown-container" onToggle={() => setShow(false)}>
			<Dropdown.Toggle id="button-dropdown-body" >
					<section
						className="contacts-btn-outline referral-btn">

						<h6>Get Referral Link</h6>
					</section>
			</Dropdown.Toggle>

			<Dropdown.Menu className="referral-dropdown-container">
				<h5>Referral link</h5>

				<div className='referral-link-container'>
					<input
						id="referral-link"
						value={`http://localhost:3000/register/referral/${username}`}
						readOnly={true}
						/>
					<OverlayTrigger show={show} placement="right" overlay={popover}>
						<button
							className='referral-copy-btn clip-btn'
							data-clipboard-target="#referral-link"
							onClick={toggleShow} >
							<MdContentCopy size={25}/>
						</button>
					</OverlayTrigger>
				</div>

			</Dropdown.Menu>
		</Dropdown>

		</>
	);
}

export default ContactReferral;