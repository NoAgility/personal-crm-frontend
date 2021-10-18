import React, { useState, useEffect } from 'react';
import ChatList from "./ChatList"
import ChatController from './ChatController.js'
import ContactController from '../contacts/ContactController.js'
import ClosedChat from "./ClosedChat"
import OpenChat from "./OpenChat"
import Cookies from 'js-cookie';
import  './Inbox.css'
import { RiNumbersFill } from 'react-icons/ri';

const Inbox = () => {

	const [chatOpen, setChatOpen] = useState(false);
	const [activeChat, setActiveChat] = useState();
	const [chats, setChats] = useState([]);
	const [user, setUser] = useState();

	// Opens a window to create a new chat
	const initiateCreateChat = () => {
		setChatOpen(false);
	}

	// Opens an existing chat in the chat window
	const openChat = (chat) => {
		setChatOpen(true);
		setActiveChat(chat);
		// getChats();
	}

	// creates a new chat with a contact
	const createChat = async (contact) => {
		if (contact) {
			await ChatController.createChat([contact.accountID]);
			getChats();
		}
	}

	// deletes a chat
	const deleteChat = async (chat) => {
		if (chat) {
			if (activeChat !== undefined && chat.chatID === activeChat.chatID) {
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
			await ChatController.sendMessage(chat.chatID, message);
			// TO DO: replace getChats() with getChatByID() to improve performance
			getChats();
		}
	}

	// deletes a message
	const deleteMessage = async (chat, message) => {
		if (chat && message) {
			await ChatController.deleteMessage(chat.chatID, message.messageID);
			// TO DO: replace getChats() with getChatByID() to improve performance
			getChats();
		}
	}

	// edits a message
	const editMessage = async (chat, message, editedMessage) => {
		if (chat && message && editedMessage) {
			await ChatController.editMessage(chat.chatID, message.messageID, editedMessage);
			// TO DO: replace getChats() with getChatByID() to improve performance
			getChats();
		}
	}

	// read in all the chats from the backend
	const getChats = async () => {
		const data = await ContactController.fetchUserByID(parseInt(Cookies.get('accountID')));
		if (data !== undefined) {
			setUser(data);
		}
		const cs = await ChatController.fetchChats();
		if (cs !== undefined && cs.length > 0) {
			setChats(cs);
			return cs;
		} else {
			setChats([]);
			return cs;
		}
	}

	// Finds the first participant in a chat that is not the user
	const findFirstParticipant =  (chat) => {
		for (let p in chat.chatParticipants) {
			if (chat.chatParticipants[p].accountID !== parseInt(Cookies.get('accountID'))) {
				return chat.chatParticipants[p];
			}
		}
		return user;
	}

	// call getChats() upon loading the page
	useEffect(() => {
		getChats();
	}, [])

	// Update the active chat when it is updated
	useEffect(() => {
		if (activeChat !== undefined) {
			const chat = chats.find(chat => chat.chatID === activeChat.chatID);
			setActiveChat(chat);
		}
	}, [chats, activeChat])

	return (
		<div className="inbox-page">
			<ChatList
				chats={chats}
				createChat={initiateCreateChat}
				openChat={openChat}
				onDelete={deleteChat}
				findFirstParticipant={findFirstParticipant}
			/>
			{chatOpen ? (
				<OpenChat
					chat={activeChat}
					firstParticipant={findFirstParticipant(activeChat)}
					deleteMessage={deleteMessage}
					sendMessage={sendMessage}
					editMessage={editMessage}
				/>
			) : <>
				<ClosedChat createChat={createChat} />
			</>}
		</div>
	)
}

export default Inbox;
