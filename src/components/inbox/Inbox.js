import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';
import InboxContacts from "./InboxContacts"
import Chat from "./Chat"


import  './Inbox.css'

const Inbox = (props) => {

	const contacts = [
		{
      		"accountID": 2,
			"accountName": "bbb",
			"dob": [ 1960, 9,16 ],
			"accountUsername": "bbb"
		},
		{
			"accountID": 3,
			"accountName": "ccc",
			"dob": [ 1960, 9,16 ],
			"accountUsername": "ccc"
		},
		{
			"accountID": 4,
			"accountName": "ddd",
			"dob": [ 1960, 9,16 ],
			"accountUsername": "ddd"
		},
  ]

   const contactIDs = [2,3,4]

	return (
		<div className="inbox-page">
			<InboxContacts
				contacts={contacts}
				contactIDs={contactIDs}
			/>
			<Chat
				contact={contacts[0]}
			/>
		</div>
	)
}

export default Inbox;
