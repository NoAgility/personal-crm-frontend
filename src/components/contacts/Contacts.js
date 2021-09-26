import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import ContactController from './ContactController.js'
import Contact from './Contact.js'
import AddContact from './AddContact.js'
import { Dropdown} from 'react-bootstrap';
import  './Contacts.css'
import { get } from 'jquery';

const Contacts = (props) => {

	const [contacts, setContacts] = useState([]);
	const [contactIDs, setContactIDs] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const [sortType, setSortType] = useState('name');

	// Delete a contact
	const deleteContact = async (contact) => {
		setContacts(contacts.filter((c) => c.contactID !== contact.contactID)) // delete from front-end
		await ContactController.deleteContact(contact); // delete from back-end
		getContacts();
	}

	// Add a contact
	const addContact = async (contact) => {
		setContacts([...contacts, contact]) // Added to the front-end
		await ContactController.addContact(contact); // Added to the back-end
	}

	// Sort Contacts alphabetically or by date added
	const sortByName = (x,y) => x.accountName > y.accountName
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

	const getContacts = async () => {
		const ids = await ContactController.fetchContacts();
		console.log(ids);
		let cs =  [];
		let cIDs = [];
		if (ids !== undefined && ids.length > 0) {
			for (const id of ids) {
				let contactData = await ContactController.fetchContactData(id);
				cs.push(contactData);
				cIDs.push(contactData.accountID);
			}
			console.log(cIDs);
			setContacts(cs);
			setContactIDs(cIDs);
		}
	}

	// Load all contacts from back-end
	useEffect(() => {

		getContacts();
	}, [])

	return (
		<div className="contacts-page">
			<div className="contact-header">
				<h1>Contacts</h1>
				<button data-testid="add-contact" className="create-contact-btn" onClick={() => setModalShow(true)}>
					<MdAdd size={22}/>
					<h4>Add</h4>
				</button>
			</div>

			<AddContact
				show={modalShow}
				onHide={() => setModalShow(false)}
				onAdd={addContact}
				contactIDs={contactIDs}
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
									key={contact.accountID}
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