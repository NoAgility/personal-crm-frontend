import React, { useState } from 'react';
import ProfilePicture from "./ProfilePic/ProfilePicture"
import ContactDetails from "./ContactDetails"
import { Dropdown } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';

const Contact = ({contact, onDelete}) => {

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<li className="contact-item" data-testid="contact" >
				<div className="contact-info" onClick={() => setModalShow(true)}>
					<ProfilePicture
						name={contact.accountUsername}
						id={contact.accountID}
						size="md"
					/>
					<h5>{contact.accountName}</h5>
				</div>

				<Dropdown className="contact-options">
					<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
						<FiMoreHorizontal className="edit-contact-options" size={30}/>
					</Dropdown.Toggle>

					<Dropdown.Menu className="contact-options-dropdown" variant="dark">
						<Dropdown.Item onClick={() => onDelete(contact)}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<ContactDetails
					contact={contact}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
			</li>
		</>
	)
}

export default Contact;