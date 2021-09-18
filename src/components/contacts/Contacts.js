import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import ContactController from './ContactController.js'
import Contact from './Contact.js'
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
	const [contacts, setContacts] = useState(
		[
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
				},
				{
					"contactID": 4,
					"contactCreatedOn": [ 2021, 9,16 ],
					"name": "Jane Ive",
					"dob": [ 1960, 2,16 ],
					"username": "Bob123",
					}
		]
	);

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="contacts-page">
			<div className="contact-header">
				<h1>Contacts</h1>
				<button className="create-contact-btn">
					<MdAdd size={22}/>
					<h4>Create</h4>
				</button>
			</div>

			<div className="contact-sub-header">
				<div className="filter-dropdown">
					<Dropdown >
						<Dropdown.Toggle id="button-dropdown-body" className="dropdown-button" align="end">
							<BiFilter className="menu-icon" size={40}/>
						</Dropdown.Toggle>

						<Dropdown.Menu variant="dark">
							<Dropdown.Item>Sort alphabetically</Dropdown.Item>
							<Dropdown.Item>Sort by date added</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>

			<div className="contact-box">
				<ul className="contact-list-group">
					{contacts.map((contact) => (
						<Contact id={contact.contactID} name={contact.name} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default Contacts;