import { isPropsEqual } from '@fullcalendar/common';
import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import ProfilePicture from "./ProfilePicture"
import { ListGroup } from 'react-bootstrap';


const Contacts = (props) => {
	return (
		<>
			<li variant="dark" className="contact-item" key={props.contactID} action>
				<ProfilePicture name={props.name} id={props.contactID} size={500} />
				<h2>{props.name}</h2>
			</li>
		</>
	)
}

export default Contacts;