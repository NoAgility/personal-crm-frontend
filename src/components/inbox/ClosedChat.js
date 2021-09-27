import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';
import Message from "./Message"
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import SearchBar from '../UIComponents/searchbar/SearchBar';
import ChatController from './ChatController.js'
import ContactController from '../contacts/ContactController.js'

import  './ClosedChat.css'

const ClosedChat = ({contact, value, createChat }) => {

	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
	const [result, setResult] = useState({});
	const [contactIDs, setContactIDs] = useState([]);

	const handleAdd = (e) => {
		// onAdd(result);
		// setContactIDs(...contactIDs, [result.accountID]);
		// console.log(contactIDs)
		createChat(result);
	}

	const queryResult = (name, username, id) => {
		return (<div className="contact-search-result">
			<ProfilePicture
				name={name}
				id={id}
				size="md"
			/>
			<div className="column">
				<h4>{name}</h4>
				<h6>@{username}</h6>
			</div>
			<button	className="add-contact-btn" onClick={handleAdd}>
				Create
			</button>
		</div>)
	}

	const noResult = () => {
		if (hasSearched) return <h5>Not found</h5>
	}

	const onSubmit = async (e) => {
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
			console.log(contactIDs)
			// if (contactIDs.includes(contact.accountID)) {
			// 	setAddComplete(true);
			// }
		} else {
			setHasSearched(true);
		}
	}

	return (
		<div className="chat">
			<div className="chat-body">

				<h1>Create new chat</h1>
				<SearchBar
					data-testid="contact-search"
					name="username"
					colorMode="light"
					width="lg"
					onSubmit={onSubmit}
					placeholder="Find contacts"
					value={usernameSearch}
					onChange={event => {setUsernameSearch(event.target.value)}}
				/>
				<div className="create-chat-result">
					{queryFound ? queryResult(result.accountName, result.accountUsername, result.accountID) : noResult()}
				</div>

			</div>
		</div>
	)
}

export default ClosedChat;