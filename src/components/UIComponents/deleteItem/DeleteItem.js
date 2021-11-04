import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import Confirmation from '../confirm/Confirmation';
const DeleteItem = ({ item, onDelete, msg }) => {
	// item : item to be deleted
	// onDelete: a function to delete the item
	const [confirmationShow, setConfirmationShow] = useState(false);
	return (
		<>
			<Confirmation
				show={confirmationShow}
				onHide={() => {setConfirmationShow(false);}}
				msg={msg}
				accept={() => {onDelete(item);}}
				cancel={() => {}}
			/>
			<Dropdown className="contact-options">
				<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
					<FiMoreHorizontal className="edit-contact-options" size={30}/>
				</Dropdown.Toggle>

				<Dropdown.Menu className="contact-options-dropdown" variant="dark">
					<Dropdown.Item onClick={() => setConfirmationShow(true)}>Delete</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

export default DeleteItem;
