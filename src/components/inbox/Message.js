import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import CookieManager from '../../util/CookieManager';
import  './Message.css';

const Message = ({ chat, message, onDelete, onEdit }) => {
	// chat - The chat that this message is in
	// message - The message object containing "messageID", "chatID", "accountID", "messageTime", "messageText"
	// onDelete - a function to delete the message
	// onEdit - a function to edit a message

	const [visibility, setVisibility] = useState('none');
	const [isEditing, setIsEditing] = useState(false);
	const [editedMessage, setEditedMessage] = useState(message.messageText);

	// flags a message as by the 'user' or by a 'contact'
	const sender = () => {
		return (message.accountID === parseInt(CookieManager.getCookie('accountID'))) ? 'user' : 'contact'
	}

	const popover = (props) => (
		<Popover {...props} id="popover-basic">
			<Popover.Content>
				<button className='message-options-btn' onClick={() => {setIsEditing(true)}}>
					Edit
				</button>
				<button className='message-options-btn' onClick={() => {onDelete(chat, message)}}>
					Delete
				</button>
			</Popover.Content>
		</Popover>
	);

	const overlay = (
		<OverlayTrigger trigger="focus" placement="left" overlay={popover}>
			<button className="message-options">
				<FiMoreHorizontal size={20}/>
			</button>
		</OverlayTrigger>
	);

	const onSubmit = (e) => {
		e.preventDefault();
		onEdit(chat, message, editedMessage)
		setIsEditing(false);
	}

	const onCancel = (e) => {
		e.preventDefault();
		setIsEditing(false);
	}

	const editMessage = (
		<form className="row" onSubmit={onSubmit} onCancel={onCancel}>
			<input
				className="search-input edit-message-input"
				type="text"
				name="editedMessage"
				id="editedMessage"
				value={editedMessage}
				onChange={event => {setEditedMessage(event.target.value)}}
			>
			</input>
				<MdClose className="edit-message-cancel-btn" onClick={onCancel} size={28}/>
		</form>
	)

	return (
		<div className={`message-container message-container-${sender()}`}
			onMouseEnter={e => {
				setVisibility('grid');
			}}
			onMouseLeave={e => {
				setVisibility('none')
			}}
		>
			<div className='message-options-container' style={{display: `${visibility}`}}>
				{(message.accountID === parseInt(CookieManager.getCookie('accountID'))) ? overlay : <></>}
			</div>
			<div className={`message message-${sender()}`}>
				{isEditing ? editMessage : <h6 className="message-text">{editedMessage}</h6>}
			</div>
		</div>
	)
}

export default Message;