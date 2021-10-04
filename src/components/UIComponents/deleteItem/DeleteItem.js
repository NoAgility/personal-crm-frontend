import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';

const DeleteItem = ({ item, onDelete }) => {
	// item : item to be deleted
	// onDelete: a function to delete the item

	return (
		<Dropdown className="contact-options">
		<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
			<FiMoreHorizontal className="edit-contact-options" size={30}/>
		</Dropdown.Toggle>

		<Dropdown.Menu className="contact-options-dropdown" variant="dark">
			<Dropdown.Item onClick={() => onDelete(item)}>Delete</Dropdown.Item>
		</Dropdown.Menu>
		</Dropdown>
	)
}

export default DeleteItem;
