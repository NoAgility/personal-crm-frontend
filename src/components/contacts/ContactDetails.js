import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfilePicture from "../UIComponents/ProfilePic/ProfilePicture"
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
						name={contact.accountName}
						id={contact.accountID}
						size="lg"
					/>
				</div>
				<div className="contact-details-right">
					<h1>{contact.accountName}</h1>
						<h5>@{contact.accountUsername}</h5>
						<h5>
						{contact.accountDOB}
					</h5>
				</div>

			</Modal.Body>
		</Modal>
		</>
	)
}

export default ContactDetails;