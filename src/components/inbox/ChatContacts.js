
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import ContactSelectorItem from '../meetings/ContactSelectorItem';
import SearchBar from '../UIComponents/searchbar/SearchBar';
import  './ChatContacts.css'

function ChatContacts({ contactItems, add, remove, selectedContactIDs }) {

	const [contactSearch, setContactSearch] = useState("");

	// prevents the page from reloading when a contact is searched for
	const onSearch = async (e) => {
		e.preventDefault();
	}

	return (
		<>

		<Dropdown className="dropdown-small">
			<Dropdown.Toggle  className="add-chat-btn app-row">
				<div className="app-row">
					<MdAdd size={22}/>
					{/* <h6>Chat</h6> */}
				</div>
			</Dropdown.Toggle>

			<Dropdown.Menu className="contact-selector-container">
				<div className="contact-selector-header">
					<h5>Find contacts</h5>
					{/* <p>You can add {1} more.</p> */}

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

				<button className="add-btn chat-btn" onClick={() => {console.log("Create Chat")}}>
					Create Chat
				</button>
			</Dropdown.Menu>

		</Dropdown>


		</>
	);
}

export default ChatContacts;