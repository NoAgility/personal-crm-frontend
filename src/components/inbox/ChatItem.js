import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
import './ChatItem.css'

const ChatItem = ({ chat, lastMessage, openChat, onDelete, firstParticipant }) => {

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