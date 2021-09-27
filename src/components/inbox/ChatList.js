import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import Filter from '../UIComponents/sort/Sort.js';
import SearchBar from '../UIComponents/searchbar/SearchBar.js';
import ContactController from '../contacts/ContactController.js'
import ChatItem from './ChatItem.js'
import  './ChatList.css'

const ChatList = ({ contactIDs, chats, createChat, openChat, onDelete }) => {
	const [sortType, setSortType] = useState('name');
	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isAdded, setAddComplete] = useState(false);
	const [result, setResult] = useState({});


	const sortByName = (x,y) => x.chatParticipants[0] > y.chatParticipants[0]
	const sortByDate = (x,y) => x.chatCreation > y.chatCreation
	const toggleSortName = () => setSortType('name')
	const toggleSortDate = () => setSortType('date')
	const sortTypes = [
		{
			label:"Sort alphabetically",
			sortFunction: toggleSortName,
		},
		{
			label:"Sort by chat age",
			sortFunction: toggleSortDate,
		},
	]

	const chatOrder = () => {
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
				<div className="inbox-contact-header-top">
					<h1>Inbox</h1>
					<div className="chat-btns row">
						<Filter sortTypes={sortTypes}/>
						<button className="add-chat-btn" onClick={createChat}>
							<MdAdd size={25}/>
						</button>
					</div>
				</div>

				<SearchBar
				name="username"
				colorMode="dark"
				width="md"
				onSearch={onSearch}
				value={usernameSearch}
				onChange={event => {setUsernameSearch(event.target.value)}}
			/>
			</div>



			<div className="inbox-contact-list">
				{(chats !== undefined && chats.length > 0) ? (
					<ul className="inbox-ul">
							{chats
								.sort(chatOrder())
								.map((chat) => (
								<ChatItem
									key={chat.chatID}
									chat={chat}
									lastMessage={chat.messages[chat.length - 1]}
									openChat={openChat}
									onDelete={onDelete}
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

export default ChatList;