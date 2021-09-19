import { isPropsEqual } from '@fullcalendar/common';
import React, { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import ProfilePicture from "./ProfilePicture"
import { Modal } from 'react-bootstrap';
import  './ContactDetails.css'
import { useHistory } from "react-router-dom";

const AddContact = (props) => {
	const [username, setUsername] = useState("");
	const [dob, setDOB] = useState("");
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");

	const history = useHistory();

	const handleClose = (e) => {
		e.preventDefault();
		history.goBack();
	}

	return (

		<>
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
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
								required
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
								required
								min="1"
								type="number"
								name="day"
								id="day"
								value={day}
								placeholder="Day"
								className="contact-input"
								onChange={event => {setDay(event.target.value)}}>
							</input>
							<select required name="month" onChange={setMonth}>
								<option selected disabled hidden>Month</option>
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
								required
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
							<button className="add-contact-btn" type="submit">Add</button>
						</div>

					</form>

				</div>

			</Modal.Body>
		</Modal>


		</>
	)
}

export default AddContact;