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
	const isGroupChat = chat.chatParticipants.length > 2 ? true : false;

	// flags a message as 'user' or 'contact'
	const sender = () => {
		return (message.accountID === parseInt(CookieManager.getCookie('accountID'))) ? 'user' : 'contact';
	}

	// Called when the edited message is submitted
	const onSubmit = (e) => {
		e.preventDefault();
		onEdit(chat, message, editedMessage);
		setIsEditing(false);
	}

	// Called when editing a message is cancelled
	const onCancel = (e) => {
		e.preventDefault();
		setIsEditing(false);
	}

	// A popover component containing the options to edit and delete a message
	const popover = (props) => (
		<Popover {...props} id="popover-basic">
			<Popover.Body>
				<button className='message-options-btn' onClick={() => {setIsEditing(true)}}>
					Edit
				</button>
				<button className='message-options-btn' onClick={() => {onDelete(chat, message)}}>
					Delete
				</button>
			</Popover.Body>
		</Popover>
	);

	// A button component that to open the popover
	const overlay = (
		<OverlayTrigger trigger="focus" placement="left" overlay={popover}>
			<button className="message-options">
				<FiMoreHorizontal size={20}/>
			</button>
		</OverlayTrigger>
	);

	// An input component in which the user can retype their message
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
				setVisibility('none');
			}}
		>
			<div className='message-options-container' style={{display: `${visibility}`}}>
				{(message.accountID === parseInt(CookieManager.getCookie('accountID'))) ? overlay : <></>}
			</div>
			<div className={`message message-${sender()}`}>
				{isGroupChat && message.accountID !== parseInt(CookieManager.getCookie('accountID')) ? <p>name</p> : <></> }
				{isEditing ? editMessage : <h6 className="message-text">{editedMessage}</h6>}
			</div>
		</div>
	)
}

export default Message;