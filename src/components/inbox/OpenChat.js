import React, { useState, useEffect, useCallback } from 'react';
import Message from "./Message"
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import SearchBar from '../UIComponents/searchbar/SearchBar';
import Cookies from 'js-cookie';
import  './OpenChat.css'

const OpenChat = ({ chat, deleteMessage, sendMessage, editMessage }) => {
	const [newMessage, setNewMessage] = useState("");
	const [messageSearch, setMessageSearch] = useState("");
	const [messages, setMessages] = useState(chat.messages);

	// Sends the message in the front-end before passing the message to the backend
	const onSend = (e) => {
		e.preventDefault()
		sendMessage(chat, newMessage)
		setNewMessage('')
	}

	// when the user searches for a message in a chat, this function is called
	const onSearch = async (e) => {
		e.preventDefault();
	}

	// Finds a participant in the chat that is not the user
	const findFirstParticipant = useCallback(() => {
		for (let p in chat.chatParticipants) {
			if (chat.chatParticipants[p].accountID !== parseInt(Cookies.get('accountID'))) {
				return chat.chatParticipants[p];
			}
		}
		return {"accountUserName": '', "accountID": -1,"accountName": ''};
	}, [chat.chatParticipants])

	const [firstParticipant, setFirstParticipant] = useState(findFirstParticipant());

	// Update the chat when the activeChat changes
	useEffect(() => {
		setMessages(chat.messages);
		setFirstParticipant(findFirstParticipant())
	}, [chat, messages, firstParticipant, findFirstParticipant])

	return (
		<div className="chat">
			<div className="chat-header">
				<ProfilePicture
					name={firstParticipant.accountUsername}
					id={firstParticipant.accountID}
					size="md"
				/>
				<h1 className="name">{firstParticipant.accountName}</h1>
				<SearchBar
					name="username"
					colorMode="dark"
					width="md"
					value={messageSearch}
					placeholder="Search in converstion"
					onChange={event => {setMessageSearch(event.target.value)}}
				/>
			</div>
			<div className="chat-body">
				{(chat.messages.length > 0) ? (
					(chat.messages)
					.filter((message) => {
						if (message.messageText.toLowerCase().includes(messageSearch.toLowerCase() )) {
							return message
						} return null
					})
						.map((message) => (
							<Message
								key={message.messageID}
								chat={chat}
								message={message}
								onDelete={deleteMessage}
								onEdit={editMessage}
							/>
						))
				):(
					<></>
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
							className="message-input"
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
