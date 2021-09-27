import React, { useState, useEffect } from 'react';
import Message from "./Message"
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import SearchBar from '../UIComponents/searchbar/SearchBar';
import AuthService from '../../util/AuthService';
import  './OpenChat.css'

const OpenChat = ({ chat, deleteMessage, sendMessage, editMessage }) => {
	const [newMessage, setNewMessage] = useState("");
	const [messageSearch, setMessageSearch] = useState("");
	const [messages, setMessages] = useState(chat.messages);

	// Sends the message in the front-end before passing the message to the backend
	const onSend = (e) => {
		e.preventDefault()
		// setMessages([...messages, {messageID : AuthService.userID, messageText:newMessage}])
		sendMessage(chat, newMessage)
		setNewMessage('')
	}

	// when the user searches for something in a chat, this function is called
	const onSearch = (e) => {
		e.preventDefault();
		// search for 'messageSearch' in the 'contact' chat
		setMessageSearch('')
	}

	// Edits the message in the front-end before passing the message on to the backend
	const onEdit = (chat, message, editedMessage) => {
		const foundIndex = messages.findIndex(x => x.messageID === message.messageID)
		message.messageText = editedMessage
		let ms = messages
		const m = {...message, messageText: editedMessage}
		ms[foundIndex] = m
		setMessages(ms)
		editMessage(chat, message, editedMessage);
	}

	// deletes the message in the front-end before deleting it in the backend
	const onDelete = (chat, message) => {
		console.log(userID)
		setMessages(messages.filter((m) => m.messageText !== message.messageText))
		deleteMessage(chat, message);

	}

	return (
		<div className="chat">
			<div className="chat-header">
				<ProfilePicture
					name={chat.chatParticipants[0].accountUsername}
					id={chat.chatParticipants[0].accountID}
					size="md"
				/>
				<h1 className="name">{chat.chatParticipants[0].accountName}</h1>
				<SearchBar
				name="username"
				colorMode="dark"
				width="md"
				onSearch={onSearch}
				value={messageSearch}
				placeholder="Search in converstion"
				onChange={event => {setMessageSearch(event.target.value)}}
			/>
			</div>
			<div className="chat-body">
				{messages.length > 0 ? (
					(messages)
						.map((message) => (
							<Message
								userID={userID}
								chat={chat}
								message={message}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						))
				):(
					<h4>No messages to display</h4>
				)}
			</div>
			<form className="chat-form" onSubmit={onSend}>
					<div className="chat-input-container">
						<div className="send-btn-container">
							<button
								className="send-btn"
								type="submit"
								disabled={(newMessage === "") ? true : false}>
								Send
							</button>
						</div>
						<input
							className={"search-input"}
							type="text"
							name="newMessage"
							id="newMessage"
							placeholder=""
							value={newMessage}
							onChange={event => {setNewMessage(event.target.value)}}
						>
						</input>
					</div>
				</form>
		</div>
	)
}

export default OpenChat;