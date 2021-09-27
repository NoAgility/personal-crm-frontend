import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';
import ChatList from "./ChatList"
import ChatController from './ChatController.js'
import ClosedChat from "./ClosedChat"
import OpenChat from "./OpenChat"
import  './Inbox.css'

const Inbox = () => {

	const [chatOpen, setChatOpen] = useState(false);
	const [activeChat, setActiveChat] = useState({});
	const [chats, setChats] = useState([]);

	// read in all the chats from the backend
	const getChats = async () => {
		const cs = await ChatController.fetchChats();
		if (cs !== undefined && cs.length > 0) {
			setChats(cs);
		}
	}

	// Opens a window to create a new chat
	const initiateCreateChat = () => {
		setChatOpen(false);
	}

	// Opens an existing chat in the chat window
	const openChat = (e, chat) => {
		e.preventDefault();
		setChatOpen(true);
		setActiveChat(chat);
	}

	// creates a new chat with a contact
	const createChat = async (contact) => {
		if (contact) {
			setChatOpen(true);
			setActiveChat(contact);
			const cs = await ChatController.createChat([contact.accountID, 3]);
			// setChats([...chats, cs]);
			getChats();
		}
	}

	// deletes a chat : BROKEN BECAUSE NOT IMPLEMENTED IN BACKEND
	const deleteChat = async (chat) => {
		if (chat) {
			if (chat.chatID === activeChat.chatID) {
				setChatOpen(false);
				setActiveChat({});
			}

			await ChatController.deleteChat(chat.chatID);
			getChats();
		}
	}

	const sendMessage = async (chat, message) => {
		if (message && chat) {
			await ChatController.sendMessage(chat.chatID, message)
			getChats();
		}

	}

	// deletes a message
	const deleteMessage = async (chat, message) => {
		if (chat && message) {
			await ChatController.deleteMessage(chat.chatID, message.messageID);
			getChats();
		}
	}

	// deletes a message
	const editMessage = async (chat, message, editedMessage) => {
		if (chat && message && editedMessage) {
			console.log(chat)
			await ChatController.editMessage(chat.chatID, message.messageID, editedMessage);
			getChats();
		}
	}

	// Load all the chats upon loading the page
	useEffect(() => {
		getChats();

	}, [])

	return (
		<div className="inbox-page">
			<ChatList
				chats={chats}
				createChat={initiateCreateChat}
				openChat={openChat}
				onDelete={deleteChat}
			/>
			{chatOpen ? (
				<OpenChat
					chat={activeChat}
					deleteMessage={deleteMessage}
					sendMessage={sendMessage}
					editMessage={editMessage}
				/>
			) : (<ClosedChat createChat={createChat} />)}
		</div>
	)
}

export default Inbox;
