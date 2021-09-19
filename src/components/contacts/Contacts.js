import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import ContactController from './ContactController.js'
import Contact from './Contact.js'
import AddContact from './AddContact.js'

import { Button, Dropdown, ListGroup } from 'react-bootstrap';
import  './Contacts.css'

const getContacts = (props) => {
	// const contactIds = ContactController.fetchContactIds();
	// contactIds.forEach(ContactController.fetchContactData);
	return [
		{
			"contactID": 9,
			"contactCreatedOn": [ 2021, 9,16 ],
			"name": "Bob Smith",
			"dob": [ 1960, 2,16 ],
			"username": "Bob123",
		},
		{
			"contactID": 4,
			"contactCreatedOn": [ 2021, 9,16 ],
			"name": "Jane Ive",
			"dob": [ 1960, 2,16 ],
			"username": "Bob123",
			}
	];
}

const Contacts = (props) => {
	const sortByName = () => {
		const sortedContacts = contacts.sort(function(x, y) {
			if (x.name < y.name) {
			  return -1;
			}
			if (x.name > y.name) {
			  return 1;
			}
			return 0;
		  });
		setContacts(sortedContacts);
	}

	const sortByDate = () => {
		const sortedContacts = contacts.sort(function(x, y) {
			if (x.contactCreatedOn < y.contactCreatedOn) {
			  return -1;
			}
			if (x.contactCreatedOn > y.contactCreatedOn) {
			  return 1;
			}
			return 0;
		  });
		setContacts(sortedContacts);
	}
	// useEffect(() => {

	// 	const getContacts = async () => {
	// 		const ids =  await ContactController.fetchContactIds();
	// 		let contacts =  [];
	// 		for (const id of ids) {
	// 			let contactData = await ContactController.fetchContactData(id);
	// 			contacts.push(contactData);
	// 		}
	// 		setContacts(contacts)
	// 	}

	// 	getContacts();
	// })

	const [contacts, setContacts] = useState([
		{
			"contactID": 9,
			"contactCreatedOn": [ 2021, 5,16 ],
			"name": "Bob Smith",
			"dob": [ 1960, 9,16 ],
			"username": "Bob123",
		},
		{
			"contactID": 917,
			"contactCreatedOn": [ 2021, 9,15 ],
			"name": "Ash Smith",
			"dob": [ 1999, 2,16 ],
			"username": "Bob123",
		},
		{
			"contactID": 2,
			"contactCreatedOn": [ 2021, 9,16 ],
			"name": "Ash Amith",
			"dob": [ 1980, 2,16 ],
			"username": "Bob123",
		},
		{
			"contactID": 4,
			"contactCreatedOn": [ 2020, 9,16 ],
			"name": "Jane Ive",
			"dob": [ 1960, 3,16 ],
			"username": "Bob123",
			}
	]);

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="contacts-page">
			<div className="contact-header">
				<h1>Contacts</h1>
				<button className="create-contact-btn" onClick={() => setModalShow(true)}>
					<MdAdd size={22}/>
					<h4>Create</h4>
				</button>
			</div>

			<AddContact
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>

			<div className="contact-sub-header">
				<div className="filter-dropdown">
					<Dropdown >
						<Dropdown.Toggle
							id="button-dropdown-body"
							className="dropdown-button"
							align="end"
						>
							<BiFilter className="menu-icon" size={40}/>
						</Dropdown.Toggle>

						<Dropdown.Menu variant="dark">
							<Dropdown.Item onClick={sortByName}>
								Sort alphabetically
							</Dropdown.Item>
							<Dropdown.Item onClick={sortByDate}>
								Sort by date added
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>


			<div className="contact-box">
				<ul className="contact-list-group">
					{contacts.map((contact) => (
						<Contact
							key={contact.contactID}
							contact={contact}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Contacts;