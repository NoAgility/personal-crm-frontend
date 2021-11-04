import React, { useEffect, useState } from 'react';
import { MdClose, MdMailOutline, MdPhone, MdApartment, MdPersonOutline, MdOutlineHouse, MdBusinessCenter } from 'react-icons/md';
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import Confirmation from '../UIComponents/confirm/Confirmation';
import { Modal, Dropdown } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import  './ContactDetails.css'
import '../form.css';
const ContactDetails = ({ contact, show, onHide, onDelete, onUpdate }) => {
	// contact : the contact object
	// show : open/closed state for the contact details modal
	// onHide : function to close the contact details modal
	const [jobTitle, setJobTitle] = useState(contact.contactJobTitle || "");
	const [company, setCompany] = useState(contact.contactCompany || "");
	const [email, setEmail] = useState(contact.contactEmail || "");
	const [phone, setPhone] = useState(contact.contactPhone || "");
	const [address, setAddress] = useState(contact.contactAddress || "");
	const [isEditing, setIsEditing] = useState(false);

	const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);

	/**
	 * On submit callback function when contact details has been saved
	 * 
	 * Call the update function
	 */
	const onSubmit = () => {
		const req = {
			contactID: contact.contactID,
			contactEmail: email,
			contactPhone: phone,
			contactAddress: address,
			contactJobTitle: jobTitle,
			contactCompany: company
		}
		onUpdate(req);
		onHide();
	}
	const handleClose = () => {
		setJobTitle(contact.contactJobTitle || "");
		setEmail(contact.contactEmail || "");
		setPhone(contact.contactPhone || "");
		setAddress(contact.contactAddress || "");
		setCompany(contact.contactCompany || "");
		setIsEditing(false);
		onHide();
	}
	/**
	 * On render, set existing values or default values
	 */
	useEffect(() => {
		setJobTitle(contact.contactJobTitle || "");
		setEmail(contact.contactEmail || "");
		setPhone(contact.contactPhone || "");
		setAddress(contact.contactAddress || "");
		setCompany(contact.contactCompany || "");
	}, [contact]);
	return (
		<>
		<Confirmation
            show={confirmDeleteShow}
            onHide={() => {setConfirmDeleteShow(false);}}
            msg={"Delete Contact?"}
            accept={() => {onDelete(contact); handleClose();}}
            cancel={() => {}}/>
		<Modal
			show={show}
			onHide={handleClose}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="modal-top">
				<FiEdit2 className="modal-header-button"
						onClick={!isEditing ? () => {setIsEditing(true)} : () => {setIsEditing(false)}} size={25}/>
					<Dropdown className="contact-options">
						<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button">
							<RiDeleteBin6Line className="modal-header-button" size={25}/>
						</Dropdown.Toggle>
						<Dropdown.Menu className="contact-options-dropdown" variant="dark">
							<Dropdown.Item
								onClick={() => {setConfirmDeleteShow(true);}}>Delete</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<MdClose className="modal-header-button" onClick={handleClose} size={30}/>
				</div>

			<Modal.Body className="contact-details">

				<div className="contact-details-top">
					<div className="contact-details-left">
						<ProfilePicture
							name={contact.accountName}
							id={contact.accountID}
							size="lg"
						/>
					</div>
					<div className="contact-details-right">
						<div className="contact-signature">
						<h1>{contact.accountName}</h1>
						<h5>@{contact.accountUsername}</h5>
						</div>
						<div className="contact-details-line"><h6>Date of Birth: {contact.accountDOB}</h6></div>
						{!isEditing ? <div className="contact-details-container-nonedit">

							<div className="contact-details-line-nonedit"><MdMailOutline className="contact-details-icon"/>{email !== "" ? <h7>{email}</h7> : <h7 className="faint">Email</h7>}</div>
							<div className="contact-details-line-nonedit"><MdPhone className="contact-details-icon"/>{phone !== "" ? <h7>{phone}</h7> : <h7 className="faint">Phone</h7>}</div>
							<div className="contact-details-line-nonedit"><MdOutlineHouse className="contact-details-icon"/>{address !== "" ? <h7>{address}</h7> : <h7 className="faint">Address</h7>}</div>
							<div className="contact-details-line-nonedit"><MdApartment className="contact-details-icon"/>{company !== "" ? <h7>{company}</h7> : <h7 className="faint">Company</h7>}</div>
							<div className="contact-details-line-nonedit"><MdBusinessCenter className="contact-details-icon"/>{jobTitle !== "" ? <h7>{jobTitle}</h7> : <h7 className="faint">Job Title</h7>}</div>
						</div> :
						<>
							<div className="contact-details-line"><MdMailOutline className="contact-details-icon"/><input className="contact-form-input" placeholder="Email" type="text" maxLength={45} onChange={(e) => setEmail(e.target.value)} value={email}/></div>
							<div className="contact-details-line"><MdPhone className="contact-details-icon"/><input className="contact-form-input" placeholder="Phone" type="tel" maxLength={20} onChange={(e) => setPhone(e.target.value)} value={phone}/></div>
							<div className="contact-details-line"><MdOutlineHouse className="contact-details-icon"/><input className="contact-form-input" placeholder="Address" type="text" maxLength={45} onChange={(e) => setAddress(e.target.value)} value={address}/></div>
							<div className="contact-details-line"><MdApartment className="contact-details-icon"/><input className="contact-form-input" placeholder="Company" type="text" maxLength={45} onChange={(e) => setCompany(e.target.value)} value={company}/></div>
							<div className="contact-details-line"><MdBusinessCenter className="contact-details-icon"/><input className="contact-form-input" placeholder="Job Title" type="text" maxLength={45} onChange={(e) => setJobTitle(e.target.value)} value={jobTitle}/></div>
						</>
						}
					</div>
				</div>
				<div className="task-details-bottom">
					<div className="add-minute-options">
						<div className="app-row">
							<button
								className="cancel-btn"
								onClick={() => {handleClose()}}>
								Cancel
							</button>
							<button
								className="meeting-submit contacts-btn"
								type="submit"
								onClick={onSubmit}>
								Save
							</button>
						</div>
					</div>
				</div>
			</Modal.Body>

		</Modal>
		</>
	)
}

export default ContactDetails;