import React, { useState, useEffect, useRef } from 'react';
import Message from "./Message"
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import SearchBar from '../UIComponents/searchbar/SearchBar';
import Cookies from 'js-cookie';
import  './OpenChat.css'

const OpenChat = ({ chat, firstParticipant, deleteMessage, sendMessage, editMessage }) => {
	// chat : the chat object
	// firstParticipant : the contact in the chat that isnt the user
	// deleteMessage : a function to delete a message
	// sendMessage : a function to send a message
	// editMessage :  a function to edit a message

	const [newMessage, setNewMessage] = useState("");
	const [messageSearch, setMessageSearch] = useState("");

	// Sends the message
	const onSend = (e) => {
		e.preventDefault();
		sendMessage(chat, newMessage);
		setNewMessage('');
	}

	const messagesEndRef = useRef(null)

 	 const scrollToBottom = () => {
    	messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  	}

	useEffect(() => {
		scrollToBottom();
	}, [])

	useEffect(() => {
		scrollToBottom();
	}, [chat])

	// when the user searches for a message, prevent page reload
	const onSearch = async (e) => {
		e.preventDefault();
	}

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
					onSubmit={onSearch}
					value={messageSearch}
					placeholder="Search in converstion"
					onChange={event => {setMessageSearch(event.target.value)}}
				/>
			</div>
			<div className="chat-body">
				{(chat.messages.length > 0) ? (
					(chat.messages)
					.filter((message) => {
						if ( message.messageText.toLowerCase().includes(messageSearch.toLowerCase()) ) {
							return message;
						} return null;
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
				<div ref={messagesEndRef}/>
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
