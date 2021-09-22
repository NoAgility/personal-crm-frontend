import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfilePicture from "./ProfilePic/ProfilePicture"
import { Modal } from 'react-bootstrap';
import  './ContactDetails.css'

const ContactDetails = ({contact, show, onHide}) => {
	const handleClose = () => {
		onHide(false);
	}

	return (
		<>
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="contact-details-top">
				<MdClose className="edit-contact-options" onClick={handleClose} size={30}/>
			</div>

			<Modal.Body className="contact-details">
				<div className="contact-details-left">
					<ProfilePicture
						name={contact.name}
						id={contact.contactID}
						size="lg"
					/>
				</div>
				<div className="contact-details-right">
					<h1>{contact.name}</h1>
					<h4>@{contact.username}</h4>
					<h4>
						{contact.dob[2]}
						/{contact.dob[1]}
						/{contact.dob[0]}
					</h4>
				</div>

			</Modal.Body>
		</Modal>
		</>
	)
}

export default ContactDetails;