import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';
import InboxContacts from "./InboxContacts"
import Chat from "./Chat"


import  './Inbox.css'

const Inbox = (props) => {

	return (
		<div className="inbox-page">
			<InboxContacts />
			<Chat />
		</div>
	)
}

export default Inbox;
