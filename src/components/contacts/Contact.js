import { isPropsEqual } from '@fullcalendar/common';
import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import ProfilePicture from "./ProfilePicture"
import ContactDetails from "./ContactDetails"
import { ListGroup } from 'react-bootstrap';
import EditContact from './EditContact';



const Contact = ({contact}) => {

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<li className="contact-item" onClick={() => setModalShow(true)}>
				<ProfilePicture
					name={contact.name}
					id={contact.contactID}
				/>
				<h4>{contact.name}</h4>

				<EditContact
					contact={contact}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>

			</li>
		</>
	)
}

export default Contact;