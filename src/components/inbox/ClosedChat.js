import React, { useState, useEffect } from 'react';
import ProfilePic from "../UIComponents/profilePic/ProfilePic";
import SearchBar from '../UIComponents/searchbar/SearchBar';
import ContactController from '../contacts/ContactController.js';
import  './ClosedChat.css'

const ClosedChat = ({ createChat }) => {
	// createChat : a function to create a chat

	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
	const [result, setResult] = useState({});

	// a component that displays a contact search result
	const queryResult = (name, username, id) => {
		return (<div className="contact-search-result">
			<ProfilePic
				name={name}
				id={id}
				size="md"
			/>
			<div className="column">
				<h4>{name}</h4>
				<h6>@{username}</h6>
			</div>
			<button	className="add-contact-btn" onClick={() => {createChat(result)}}>
				Create
			</button>
		</div>)
	}

	// A component to display when no componenet has been found
	const noResult = () => {
		if (hasSearched) return <h5 data-testid="contact-search-null-result">Not found</h5>
	}

	// searches for contacts to add to a new chat
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
					onSubmit={onSearch}
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