import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import Filter from '../UIComponents/filter/Filter.js';
import SearchBar from '../UIComponents/searchbar/SearchBar.js';
import ContactController from '../contacts/ContactController.js'
import InboxContact from './InboxContact.js'


import  './InboxContacts.css'

const InboxContacts = ({contactIDs, contacts}) => {
	const [sortType, setSortType] = useState('name');
	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isAdded, setAddComplete] = useState(false);
	const [result, setResult] = useState({});

	const openChat = () => {

	}


	const sortByName = (x,y) => x.accountName > y.accountName
	//TO DO: Sort this date last contacted
	const sortByDate = (x,y) => x.accountName > y.accountName
	const toggleSortName = () => setSortType('name')
	const toggleSortDate = () => setSortType('date')
	const sortTypes = [
		{
			label:"Sort alphabetically",
			sortFunction: toggleSortName,
		},
		{
			label:"Sort by last contacted",
			sortFunction: toggleSortDate,
		},
	]

	const contactOrder = () => {
		if (sortType === 'name') {
			return sortByName;
		} else {
			return sortByDate;
		}
	}

	const onSearch = async (e) => {
		e.preventDefault();
		// reset search results
		setQueryFound(false);
		setResult({});

		// search for username
		const contact = await ContactController.fetchUserByUsername(usernameSearch).then(res => {
			return res.data;});
		if (contact) {
			setQueryFound(true);
			setResult(contact);
			if (contactIDs.includes(contact.accountID)) {
				setAddComplete(true);
			}
		} else {
			setHasSearched(true);
		}
	}

	return (
		<div className="inbox-contacts">
			<div className="inbox-contact-header">
				<h1>Inbox</h1>
				<Filter sortTypes={sortTypes}/>
			</div>

			<SearchBar
				name="username"
				colorMode="dark"
				width="md"
				onSearch={onSearch}
				value={usernameSearch}
				onChange={event => {setUsernameSearch(event.target.value)}}
			/>

			<div className="inbox-contact-list">
				{contacts.length > 0 ? (
					<ul className="inbox-ul">
							{contacts
								.sort(contactOrder())
								.map((contact) => (
								<InboxContact
									key={contact.accountID}
									contact={contact}
									lastMessage={""}
									openChat={openChat}
								/>
							))}
					</ul>
				):(
					<h5>No chats to display</h5>
				)}
			</div>
		</div>
	)
}

export default InboxContacts;