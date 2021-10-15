import { isPropsEqual } from '@fullcalendar/common';
import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import ProfilePicture from "../UIComponents/ProfilePicture"
import { Modal, Dropdown } from 'react-bootstrap';
import  './ContactDetails.css'
import { useHistory } from "react-router-dom";

const EditContact = ({ onShow, onHide, contact }) => {
	// show : open/closed state for the add contact modal
	// onHide : function to close the add contact modal
	// contact : the contact object
	const [username, setUsername] = useState(contact.name);
	const [dob, setDOB] = useState("");
	const [day, setDay] = useState(contact.dob[2]);
	const [month, setMonth] = useState(contact.dob[1]);
	const [year, setYear] = useState(contact.dob[0]);
	const [modalShow, setModalShow] = React.useState(false);

	const history = useHistory();

	// handles the close of the edit contact modal
	const handleClose = (e) => {
		e.preventDefault();
		history.goBack();
	}

	// handles the delete of a contact
	const handleDelete = (e) => {
		e.preventDefault();
		history.goBack();
	}

	return (
		<>
		<Modal
			onShow={onShow}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="contact-details-top">
				<Dropdown >
					<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
						<FiMoreHorizontal className="edit-contact-options" size={30}/>
					</Dropdown.Toggle>

					<Dropdown.Menu className="contact-options-dropdown" variant="dark">
						<Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<Modal.Body className="contact-details">
				<div className="contact-details-left">
					<ProfilePicture
						name={username}
						id={2}
					/>
				</div>
				<div className="contact-details-right">
					<form>
						<div className="username-selector">
							<input
								required={true}
								type="text"
								name="username"
								id="username"
								value={username}
								placeholder="Username"
								className="contact-input"
								onChange={event => {setUsername(event.target.value)}}>
							</input>
						</div>
							<div className="dob-selector">
							<input
								required={true}
								min="1"
								type="number"
								name="day"
								id="day"
								value={day}
								placeholder="Day"
								className="contact-input"
								onChange={event => {setDay(event.target.value)}}>
							</input>
							<select required name="month" value={month} onChange={setMonth}>
								<option value="1">January</option>
								<option value="2">February</option>
								<option value="3">March</option>
								<option value="4">April</option>
								<option value="5">May</option>
								<option value="6">June</option>
								<option value="7">July</option>
								<option value="8">August</option>
								<option value="9">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</select>
							<input
								required={true}
								min={((new Date().getFullYear()) - 120).toString()}
								max={(new Date().getFullYear()).toString()}
								type="number"
								name="year"
								id="year"
								value={year}
								placeholder="Year"
								className="contact-input"
								onChange={event => {setYear(event.target.value)}}>
							</input>
						</div>
						<div classname="add-contact-btns">
							<button className="cancel-add-contact-btn" onClick={handleClose}>Cancel</button>
							<button className="add-contact-btn" type="submit">Save</button>
						</div>
					</form>
				</div>
			</Modal.Body>
		</Modal>
		</>
	)
}

export default EditContact;