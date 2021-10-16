import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import ContactSelectorItem from './ContactSelectorItem';
import SearchBar from '../UIComponents/searchbar/SearchBar';

function MeetingContacts({ contactItems, add, remove, selectedContactIDs }) {

	const [contactSearch, setContactSearch] = useState("");

	// prevents the page from reloading when a contact is searched for
	const onSearch = async (e) => {
		e.preventDefault();
	}

	return (
		<>
		<Dropdown className="dropdown-small">
			<Dropdown.Toggle id="button-dropdown-body" className="add-btn add-btn-long contacts-btn">
					<MdAdd size={22}/>
					<h4>Add Contacts</h4>
			</Dropdown.Toggle>

			<Dropdown.Menu className="contact-selector-container">
				<div className="contact-selector-header">
				<SearchBar
					name="username"
					colorMode="light"
					width="sm"
					onSubmit={onSearch}
					value={contactSearch}
					onChange={event => {setContactSearch(event.target.value)}}
				/>
				</div>
				<div className="contact-selector-body">
					{contactItems
						.filter((contact) => {
							if(contact.accountName.toLowerCase().includes(contactSearch.toLowerCase())) {
								return contact;
							} return null;
						})
						.map(contact =>
							<ContactSelectorItem
								key={contact.accountID}
								contactItem={contact}
								add={add}
								remove={remove}
								isChecked={selectedContactIDs.includes(contact.accountID) ? true : false}/>
					)}
				</div>
			</Dropdown.Menu>
		</Dropdown>

		</>
	);
}

export default MeetingContacts;