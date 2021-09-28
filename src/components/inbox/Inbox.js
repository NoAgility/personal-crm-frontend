import React, { useState, useEffect } from 'react';
import ChatList from "./ChatList"
import ChatController from './ChatController.js'
import ClosedChat from "./ClosedChat"
import OpenChat from "./OpenChat"
import  './Inbox.css'

const Inbox = () => {

	const [chatOpen, setChatOpen] = useState(false);
	const [activeChat, setActiveChat] = useState();
	const [chats, setChats] = useState([]);

	// Opens a window to create a new chat
	const initiateCreateChat = () => {
		setChatOpen(false);
	}

	// Opens an existing chat in the chat window
	const openChat = (e, chat) => {
		// e.preventDefault();
		setChatOpen(true);
		setActiveChat(chat);
		getChats();
	}

	// creates a new chat with a contact
	const createChat = async (contact) => {
		if (contact) {
			await ChatController.createChat([contact.accountID]);
			console.log(chats)
			getChats();
		}
	}

	// deletes a chat
	const deleteChat = async (chat) => {
		setChatOpen(false)
		if (chat) {
			if (chat.chatID === activeChat.chatID) {
				setChatOpen(false);
				setActiveChat({});
			}
			await ChatController.deleteChat(chat.chatID);
			getChats();
		}
	}

	// sends a message
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

	// edits a message
	const editMessage = async (chat, message, editedMessage) => {
		if (chat && message && editedMessage) {
			await ChatController.editMessage(chat.chatID, message.messageID, editedMessage);
			getChats();
		}
	}

	// read in all the chats from the backend
	const getChats = async () => {
		const cs = await ChatController.fetchChats();
		if (cs !== undefined && cs.length > 0) {
			setChats(cs);
			return cs;
		}
	}

	// call getChats() upon loading the page
	useEffect(() => {
		getChats();
	}, [])

	// Update the active chat when it is updated
	useEffect(() => {
		if (activeChat !== undefined) {
			const chat = chats.find(chat => chat.chatID === activeChat.chatID)
			setActiveChat(chat)
		}
	}, [chats, activeChat])

	// call getChats() the a chat is opened up
	useEffect(() => {
		getChats();
	}, [chatOpen])

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
