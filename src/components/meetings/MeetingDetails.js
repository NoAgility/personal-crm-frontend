import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd , MdGroup} from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { Modal, Accordion, Dropdown } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import CookieManager from '../../util/CookieManager';
import Minute from './Minute';
import  './MeetingDetails.css';
import './Meetings.css';
import "../form.css";
import EditMeeting from './EditMeeting';

const MeetingDetails = ({meeting, show, onHide, meetingOptions, minuteOptions}) => {

	const minLimit = 5;
	const overLimit = (meeting.meetingParticipants.length > minLimit) ? true : false;
	const [limit, setLimit] = useState(minLimit);
	const [expanded, setExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [openMinute, setOpenMinute] = useState(false);
	const [minute, setMinute] = useState('');
	const userID = parseInt(CookieManager.getCookie('accountID'));

	const handleClose = () => {
		onHide();
	}

	const handleDelete = () => {
		onHide();
		meetingOptions.onDelete(meeting);
	}


	const handleSaveMinute = (e) => {
		e.preventDefault();
		setOpenMinute(false);
		minuteOptions.onAdd(meeting, minute);
		setMinute('');
	}

	const handleOpenAddMinute = () => {
		setOpenMinute(true);
	}

	const handleCloseAddMinute = () => {
		setMinute('');
		setOpenMinute(false);
	}

	const toggleIsEditing = () => {
		isEditing ? setIsEditing(false) : setIsEditing(true);
	}

	const getParticipants = () => {
		const ps = meeting.meetingParticipants;
		if (ps.length > limit) {
			return (
				<>
					{ps.slice(0, limit).map((p) => (
						<ProfilePic
							key={p.data.accountID}
							name={p.data.accountName}
							size={"sm"}
							id={p.data.accountID}
						/>
					))}
				</>
			)
		}
		return (ps.map((p) => (
				<ProfilePic
					key={p.data.accountID}
					name={p.data.accountName}
					size={"sm"}
					id={p.data.accountID}
				/>
		)))
	}

	const getDisplayDate = () => {
		const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
		const timeOptions = {hour: 'numeric', minute: 'numeric'};
		const start = new Date(meeting.meetingStart);
		const end = new Date(meeting.meetingEnd);
		let date = "";
		let time = "  :  ";
		if (start.getDate() === end.getDate()) {
			date = start.toLocaleDateString("en-UK", dateOptions);
			time += start.toLocaleTimeString("en-UK", timeOptions);
			time += " - ";
			time += end.toLocaleTimeString("en-UK", timeOptions);
		}

		return date += time;
	}

	return (
		<>
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="modal-top">
				<FiEdit2 className="modal-header-button"
					style={{display: `${meeting.meetingCreatorID === userID ? 'block' : 'none'}`}}
					onClick={!isEditing ? () => {setIsEditing(true)} : () => {setIsEditing(false)}} size={25}/>
				<Dropdown className="contact-options">
					<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button"
					style={{display: `${meeting.meetingCreatorID === userID ? 'block' : 'none'}`}}>
						<RiDeleteBin6Line className="modal-header-button" size={25}/>
					</Dropdown.Toggle>
					<Dropdown.Menu className="contact-options-dropdown" variant="dark">
						<Dropdown.Item disabled={meeting.meetingCreatorID === userID ? false : true }
							onClick={handleDelete}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<MdClose className="modal-header-button" onClick={handleClose} size={30}/>
			</div>

			<Modal.Body className="meeting-modal">

				{isEditing ?
				<EditMeeting
					meeting={meeting}
					onHide={onHide}
					meetingOptions={meetingOptions}
					toggleIsEditing={toggleIsEditing}

				/>
				:
				<div className="meeting-details">
					<div className="meeting-details-name">
						<MdGroup size={25}/>
						<h1>{meeting.meetingName}</h1>
					</div>
					<h3 className="offwhite">{meeting.meetingDescription}</h3>
					<p>{getDisplayDate()}</p>

					<Accordion className="accordion-flush">
							<Accordion.Item  eventKey={0}>
							<Accordion.Header className="accordion-participants-header">
							<div className="meeting-details-participants app-row">
								{getParticipants()}
								{overLimit ? (
									<span className="show-more-meeting-participants super-center" >
										<h6>{expanded ? '' : `+${meeting.meetingParticipants.length - limit} others`}</h6>
									</span> )
									: (<></>)}
							</div>
							</Accordion.Header>
								<Accordion.Body className="accordion-participants-list">
									{meeting.meetingParticipants
										.map((p) => (
												<div className="app-row" key={p.data.accountID}>
													<ProfilePic
														name={p.data.accountName}
														size={"xs"}
														id={p.data.accountID}
													/>
													<h6>{p.data.accountName}
													{p.data.accountID === meeting.meetingCreatorID ? <i>(Owner)</i> : ''}</h6>
													<h6 className={`participant-tag participant-${p.accepted ? 'coming' : 'invited'}`}>
														{p.accepted ? 'Coming' : 'Invited'}
													</h6>
												</div>

									))}
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>

					<button
						style={openMinute ? {display : 'none'} : {display : 'flex'}}
						className="add-minute-btn app-row"
						onClick={handleOpenAddMinute} >
							<div className="small-add-btn meeting-btn">
								<MdAdd size={20} color={'white'}/>
							</div>
							<h6>Add minutes</h6>
					</button>
					<div className="add-minute-form-container" style={openMinute ? {display : 'block'} : {display : 'none'}} >
						<form id="add-minute" onSubmit={handleSaveMinute}>
							<textarea className="add-minute-text" value={minute}
							onChange={(e) => {setMinute(e.target.value)}} form="add-minute"
							maxLength={100} placeholder="Add meeting minutes" required={true} />

							<div className="add-minute-options">
								<div className="row">
									<button
										className="cancel-btn"
										onClick={handleCloseAddMinute}>
										Cancel
									</button>
									<button
										type="submit"
										className="meeting-submit meeting-btn">
										Save
									</button>
								</div>
							</div>
						</form>

					</div>
					{meeting.meetingMinutes !== undefined && meeting.meetingMinutes.length > 0 ?
						<Accordion className="accordion-flush ">
							<Accordion.Item  eventKey={0}>
							<Accordion.Header className="accordion-header">View Minutes</Accordion.Header>

								<div className="">
									{(meeting.meetingMinutes)
										.map((m) => (
											<Accordion.Body key={m.minuteID}>
												<Minute
													minuteOptions={minuteOptions}
													meeting={meeting}
													minute={m}
													author={meeting.meetingParticipants.filter(p=> {
														return p.data.accountID === m.accountID;
													  })[0].data
													}
												/>
											</Accordion.Body>
									))}
								</div>
							</Accordion.Item>
						</Accordion>
					: <></>}
				</div>
				}


			</Modal.Body>
			<div className="meeting-details-bottom">

			</div>

		</Modal>
		</>
	)
}

export default MeetingDetails;