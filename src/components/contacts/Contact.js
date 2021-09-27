import React, { useState } from 'react';
import ProfilePicture from "../UIComponents/profilePic/ProfilePicture"
import DeleteItem from "../UIComponents/deleteItem/DeleteItem"
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

				<DeleteItem item={contact} onDelete={onDelete}/>

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