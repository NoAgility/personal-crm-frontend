import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import Sort from '../UIComponents/sort/Sort.js';
import SearchBar from '../UIComponents/searchbar/SearchBar.js';
import ChatItem from './ChatItem.js'
import { Dropdown } from 'react-bootstrap';
import ChatContacts from './ChatContacts.js';
import ContactController from '../contacts/ContactController.js';

import  './ChatList.css'

const ChatList = ({ chats, createChat, openChat, onDelete, findFirstParticipant }) => {
	// chats : an array of all chat objects
	// createChat : a function to create a new chat
	// openChat : a function to open a chat in the chat window
	// onDelete : a funciton to delete a chat
	// findFirstParticipant : a function to find the contact in a chat that isnt the user

	const [sortType, setSortType] = useState('age');
	const [chatSearch, setChatSearch] = useState("");
	const [contacts, setContacts] = useState([]);
    const [selectedContactIDs, setSelectedContactIDs] = useState([]);

	/**
	 * Function to add contact to selection
	 * @param {*} contact The contact to be added
	 */
		const addContactSelection = (contact) => {
		setSelectedContactIDs([...selectedContactIDs, contact.accountID]);
	}

	/**
	 * Function to remove contact from the selection
	 * @param {*} contact The contact to be removed
	 */
	const removeContactSelection = (contact) => {
        const index = selectedContactIDs.indexOf(contact.accountID);
        selectedContactIDs.splice(index, 1);
    }


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

	// prevents the page from reloading when a chat is searched for
	const onSearch = async (e) => {
		e.preventDefault();
	}

	 /**
     * On render, load contacts for them to be addable to the form
     */
	  useEffect(() => {

        const getContacts = async () => {
            const ids = await ContactController.fetchContacts();
            let cs =  [];
            if (ids !== undefined && ids.length > 0) {
                for (const id of ids) {
                    let contactData = await ContactController.fetchContactData(id);
                    cs.push(contactData);
                }
                setContacts(cs);
            }
        }

        getContacts();
    }, []);

	return (
		<div className="inbox-contacts">
			<div className="inbox-contact-header">
				<div className="inbox-contact-header-top">
					<h1>Inbox</h1>
					<div className="chat-btns app-row">
							<Sort sortTypes={sortTypes}/>
							<button className="add-chat-btn" onClick={createChat}>
								<MdAdd size={25} color={'white'}/>
							</button>

							{/* <ChatContacts
								contactItems={contacts}
								add={addContactSelection}
								remove={removeContactSelection}
								selectedContactIDs={selectedContactIDs}/> */}
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