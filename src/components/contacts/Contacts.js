import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import ContactController from './ContactController.js'
import Contact from './Contact.js'
import AddContact from './AddContact.js'
import { Dropdown} from 'react-bootstrap';
import  './Contacts.css'

const Contacts = (props) => {

	const [contacts, setContacts] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const [sortType, setSortType] = useState('name');

	// Delete a contact
	const deleteContact = async (contact) => {
		setContacts(contacts.filter((c) => c.contactID !== contact.contactID)) // delete from front-end
		await ContactController.deleteContact(contact); // delete from back-end
	}

	// Add a contact
	const addContact = async (contact) => {
		setContacts([...contacts, contact]) // Added to the front-end
		await ContactController.addContact(contact.accountUsername); // Added to the back-end
	}

	// Sort Contacts alphabetically or by date added
	const sortByName = (x,y) => x.name > y.name
	const sortByDate = (x,y) => x.contactCreatedOn > y.contactCreatedOn
	const toggleSortName = () => setSortType('name')
	const toggleSortDate = () => setSortType('date')

	const contactOrder = () => {
		if (sortType === 'name') {
			return sortByName;
		} else {
			return sortByDate;
		}
	}

	// Load all contacts from back-end
	useEffect(() => {
		const getContacts = async () => {
			const ids =  await ContactController.fetchContacts();
			let cs =  [];
			if (ids !== undefined) {
				for (const id of ids) {
					let contactData = await ContactController.fetchContactData(id);
					cs.push(contactData);
				}
				setContacts(cs)
			}
		}
		getContacts();
	}, [])

	return (
		<div className="contacts-page">
			<div className="contact-header">
				<h1>Contacts</h1>
				<button className="create-contact-btn" onClick={() => setModalShow(true)}>
					<MdAdd size={22}/>
					<h4>Add</h4>
				</button>
			</div>

			<AddContact
				show={modalShow}
				onHide={() => setModalShow(false)}
				onAdd={addContact}
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
							<Dropdown.Item onClick={toggleSortName}>
								Sort alphabetically
							</Dropdown.Item>
							<Dropdown.Item  onClick={toggleSortDate}>
								Sort by date added
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>

			<div className="contact-box">
				{contacts.length > 0 ? (
					<ul className="contact-list-group">
							{contacts
								.sort(contactOrder())
								.map((contact) => (
								<Contact
									key={contact.contactID}
									contact={contact}
									onDelete={deleteContact}
								/>
							))}
					</ul>
				):(
					<h4>No Contacts to display</h4>
				)}
			</div>
		</div>
	)
}

export default Contacts;