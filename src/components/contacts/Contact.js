import React, { useState } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
import ContactDetails from "./ContactDetails"
import { Dropdown } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import Confirmation from '../UIComponents/confirm/Confirmation';

const Contact = ({ contact, onDelete }) => {
	// contact: the contact object
	// onDelete: a function to delete a contact

	const [modalShow, setModalShow] = useState(false);
	const [confirmShow, setConfirmShow] = useState(false);
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

				<Dropdown className="contact-options meeting-item-options">
					<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
						<FiMoreHorizontal className="modal-header-button" size={28}/>
					</Dropdown.Toggle>
					<Dropdown.Menu className="contact-options-dropdown" variant="dark">
						<Dropdown.Item
							onClick={() => setConfirmShow(true)}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				
				<Confirmation
					show={confirmShow}
					onHide={() => setConfirmShow(false)}
					msg="Delete Contact?"
					accept={() => onDelete(contact)}
					cancel={() => {}}
				/>
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