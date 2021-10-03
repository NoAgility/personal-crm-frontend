import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import Sort from '../UIComponents/sort/Sort.js';
import SearchBar from '../UIComponents/searchbar/SearchBar.js';
import ChatItem from './ChatItem.js'
import  './ChatList.css'

const ChatList = ({ chats, createChat, openChat, onDelete, findFirstParticipant }) => {

	const [sortType, setSortType] = useState('age');
	const [chatSearch, setChatSearch] = useState("");

	// functions for sorting the chats
	const sortByName = (x,y) => findFirstParticipant(x).accountName > findFirstParticipant(y).accountName;
	const sortByContacted = (x,y) => getLastMessage(x).messageTime < getLastMessage(y).messageTime;
	const sortByAge = (x,y) => x.chatCreation < y.chatCreation;
	const toggleSortName = () => setSortType('name');
	const toggleSortContacted = () => setSortType('contacted');
	const toggleSortAge = () => setSortType('age');

	const sortTypes = [
		{
			label:"Sort by name",
			sortFunction: toggleSortName,
		},
		{
			label:"Sort by last contacted",
			sortFunction: toggleSortContacted,
		},
		{
			label:"Sort by chat age",
			sortFunction: toggleSortAge,
		},
	];

	// sets the sortType based on the state
	const chatOrder = () => {
		if (sortType === 'name') {
			return sortByName;
		} else if (sortType === 'contacted') {
			return sortByContacted;
		} else {
			return sortByAge;
		}
	}

	// gets the most recent message
	const getLastMessage = (chat) => {
		if (chat.messages.length > 0) {
			return chat.messages[chat.messages.length - 1];
		} else {
			return {
				"messageText": '',
				"messageTime": 0
			};
		}
	}

	const onSearch = async (e) => {
		e.preventDefault();
	}

	return (
		<div className="inbox-contacts">
			<div className="inbox-contact-header">
				<div className="inbox-contact-header-top">
					<h1>Inbox</h1>
					<div className="chat-btns row">
						<Sort sortTypes={sortTypes}/>
						<button className="add-chat-btn" onClick={createChat}>
							<MdAdd size={25} color={'white'}/>
						</button>
					</div>
				</div>

				<SearchBar
				name="username"
				colorMode="dark"
				width="md"
				onSubmit={onSearch}
				value={chatSearch}
				onChange={event => {setChatSearch(event.target.value)}}
			/>
			</div>
			<div className="inbox-contact-list">
				{(chats !== undefined && chats.length > 0) ? (
					<ul className="inbox-ul">
							{chats
								.sort(chatOrder())
								.filter((chat) => {
									if(chatSearch === ""
										|| findFirstParticipant(chat).accountName.toLowerCase().includes(chatSearch.toLowerCase())) {
										return chat;
									} return null;
								})
								.map((chat) => (
								<ChatItem
									key={chat.chatID}
									chat={chat}
									lastMessage={getLastMessage(chat).messageText}
									openChat={openChat}
									onDelete={onDelete}
									firstParticipant={findFirstParticipant(chat)}
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