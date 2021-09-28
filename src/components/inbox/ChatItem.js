import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
import Cookies from 'js-cookie';
import './ChatItem.css'

const ChatItem = ({ chat, lastMessage, openChat, onDelete }) => {

	const findFirstParticipant = () => {
		for (let p in chat.chatParticipants) {
			if (chat.chatParticipants[p].accountID !== parseInt(Cookies.get('accountID'))) {
				return chat.chatParticipants[p];
			}
		}
		return null;
	}
	const [firstParticipant, setFirstParticipant] = useState(findFirstParticipant());

	return (
		<>
			<li className="inbox-contact-item" onClick={(e) => openChat(e,chat)}>
				<div className="inbox-contact-item-info">
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