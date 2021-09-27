import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
import  './ChatItem.css'

const ChatItem = ({ chat, lastMessage, openChat, onDelete }) => {

	return (
		<>
			<li className="inbox-contact-item" onClick={(e) => openChat(e,chat)}>
				<ProfilePicture
					name={chat.chatParticipants[0].accountUsername}
					id={chat.chatParticipants[0].accountID}
					size="md"
				/>
				<div className="column chat-description">
					<h5>{chat.chatParticipants[0].accountName}</h5>
					<p>{lastMessage}</p>
				</div>

				<DeleteItem item={chat} onDelete={onDelete} />
			</li>

		</>
	)
}

export default ChatItem;