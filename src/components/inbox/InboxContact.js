import React, { useState, useEffect } from 'react';
import ProfilePicture from "../UIComponents/ProfilePic/ProfilePicture"
import  './InboxContact.css'

const InboxContact = ({contact, lastMessage, openChat}) => {

	return (
		<div>
			<li className="inbox-contact-item" onClick={() => openChat(contact.accountID)}>
				<ProfilePicture
					name={contact.accountUsername}
					id={contact.accountID}
					size="md"
				/>
				<h6>{contact.accountName}</h6>
				<p>{lastMessage}</p>
			</li>

		</div>
	)
}

export default InboxContact;