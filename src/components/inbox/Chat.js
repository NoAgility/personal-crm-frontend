import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';
import Message from "./Message"
import ProfilePicture from "../UIComponents/ProfilePic/ProfilePicture"
import SearchBar from '../UIComponents/searchbar/SearchBar';


import  './Chat.css'

const Chat = ({contact, onSend, newMessage, value, onChange, onSearch, messageSearch, setUsernameSearch}) => {

	return (
		<div className="chat">
			<div className="chat-header">
				<ProfilePicture
					name={contact.accountUsername}
					id={contact.accountID}
					size="md"
				/>
				<h1 className="name">{contact.accountName}</h1>
				<SearchBar
				name="username"
				colorMode="dark"
				width="md"
				onSearch={onSearch}
				value={messageSearch}
				placeholder="Search in converstion"
				onChange={event => {setUsernameSearch(event.target.value)}}
			/>
			</div>
			<div className="chat-body">
				<Message content="I really want a hot dog" sender="contact"/>
				<Message content="I want one too" sender="user"/>
				<Message content="yeah..." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>

				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>
				<Message content="yeah.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.." sender="contact"/>


			</div>
			<form className="chat-form" onSubmit={onSend}>
					<div className="chat-input-container">
						<div className="send-btn-container">
							<button className="send-btn" type="submit">Send</button>
						</div>
						<input
							className={"search-input"}
							type="text"
							name={newMessage}
							id={newMessage}
							value={value}
							placeholder=""
							onChange={onChange}
						>
						</input>

					</div>
				</form>
		</div>
	)
}

export default Chat;