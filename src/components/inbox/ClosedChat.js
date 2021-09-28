import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import SearchBar from '../UIComponents/searchbar/SearchBar';
import ContactController from '../contacts/ContactController.js'
import  './ClosedChat.css'

const ClosedChat = ({ createChat }) => {

	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
	const [result, setResult] = useState({});

	const handleAdd = () => {
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