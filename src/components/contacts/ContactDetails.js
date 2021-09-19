import { isPropsEqual } from '@fullcalendar/common';
import React, { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import ProfilePicture from "./ProfilePicture"
import { Modal, CLose } from 'react-bootstrap';
import  './ContactDetails.css'

import { ListGroup } from 'react-bootstrap';



const ContactDetails = (props) => {

	return (
		<>
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Body className="contact-details">
				<div className="contact-details-left">
					<BiChevronLeft closeButton size={40}/>
					<ProfilePicture
						name={props.contact.name}
						id={props.contact.contactID}
					/>
				</div>
				<div className="contact-details-right">
					<h1>{props.contact.name}</h1>
					<h4>
						{props.contact.dob[2]}
						/{props.contact.dob[1]}
						/{props.contact.dob[0]}
						</h4>
					<button className="edit-contact-btn">Edit</button>


				</div>

			</Modal.Body>
		</Modal>


		</>
	)
}

export default ContactDetails;