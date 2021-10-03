import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
import './ChatItem.css'

const ChatItem = ({ chat, lastMessage, openChat, onDelete, firstParticipant }) => {
	// chat : the chat object
	// lastMessage : The most recent message sent into the chat
	// openChat : a function to open the chat in the chat window
	// onDelete : a function to delete the the chat
	// firstParticipant : the user object of the other contact in the chat

	return (
		<>
			<li className="inbox-contact-item" >
				<div className="inbox-contact-item-info" onClick={() => openChat(chat)}>
					<ProfilePicture
						name={firstParticipant.accountUsername}
						id={firstParticipant.accountID}
						size="md"
					/>
					<div className="column chat-description">
						<h5>{firstParticipant.accountName}</h5>
						<p>{lastMessage}</p>
					</div>
				</div>

				<DeleteItem item={chat} onDelete={onDelete} />
			</li>

		</>
	)
}

export default ChatItem;