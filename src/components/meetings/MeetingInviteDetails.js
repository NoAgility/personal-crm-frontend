import React, { useState, useEffect } from 'react';
import { MdClose , MdGroup } from 'react-icons/md';
import { Modal, Accordion, Dropdown } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import  './MeetingDetails.css';
import './Meetings.css';
import "../form.css";


const MeetingInviteDetails = ({ meeting, show, onHide, onAccept, onDecline }) => {

	const minLimit = 6;
	const overLimit = (meeting.meetingParticipants.length > minLimit) ? true : false;
	const [limit, setLimit] = useState(minLimit);
	const [expanded, setExpanded] = useState(false);

	const handleClose = () => {
		onHide();
	}

	const handleDecline = () => {
		onHide();
		onDecline(meeting);
	}

	const handleAccept = () => {
		onHide();
		onAccept(meeting);
	}

	const toggleShowMore = () => {
		if (expanded) {
			setLimit(minLimit);
			setExpanded(false);
		} else {
			setLimit(meeting.meetingParticipants.length);
			setExpanded(true);
		}
	}

	const getParticipants = () => {
		const ps = meeting.meetingParticipants;
		if (ps.length > limit) {
			return (
				<>
					{ps.slice(0, limit).map((p) => (
						<ProfilePic
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
			<div className="modal-top ">
				<MdClose className="modal-header-button" onClick={handleClose} size={30}/>
			</div>

			<Modal.Body className="meeting-modal">
				<div className="meeting-details">
					<div className="meeting-details-name">
						<MdGroup size={25}/>
						<h1>{meeting.meetingName}</h1>
					</div>
					<div className="offwhite">
						<h3>{meeting.meetingDescription}</h3>
					</div>
					<p>{getDisplayDate()}</p>

					<div className="meeting-details-participants row">
						{getParticipants()}
						{overLimit ? (
							<span className="show-more-meeting-participants super-center" onClick={toggleShowMore}>
								<h6>{expanded ? ('show less') : (`show +${limit}`)}</h6>
							</span> )
							: (<></>)}
					</div>
				</div>
				<div className="meeting-details-bottom">
				<button
					className="cancel-btn"
					onClick={handleDecline}>
					Decline
				</button>
				<button
					className="meeting-submit meeting-btn"
					onClick={handleAccept}>
					Accept
				</button>
			</div>
			</Modal.Body>
		</Modal>
		</>
	)
}

export default MeetingInviteDetails;