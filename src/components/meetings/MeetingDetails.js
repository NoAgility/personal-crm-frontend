import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { Modal, Accordion } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import  './MeetingDetails.css';
import './Meetings.css';
import "../form.css";

const MeetingDetails = ({meeting, show, onHide, onUpdate, onDelete}) => {

	const minLimit = 6;
	const overLimit = (meeting.meetingParticipants.length > minLimit) ? true : false;
	const [limit, setLimit] = useState(minLimit);
	const [expanded, setExpanded] = useState(false);

	const handleEdit = () => {
		onUpdate();
	}

	const handleClose = () => {
		onHide();
	}

	const handleDelete = () => {
		onDelete();
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
						name={p.accountName}
						size={"sm"}
						id={p.accountID} />
					))}

				</>
			)
		}
		return (ps.map((p) => (
			<ProfilePic
				name={p.accountName}
				size={"sm"}
				id={p.accountID}
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
				<FiEdit2 className="modal-header-button" onClick={handleEdit} size={25}/>
				<RiDeleteBin6Line className="modal-header-button"  onClick={handleDelete} size={25}/>
				<MdClose className="modal-header-button" onClick={handleClose} size={30}/>
			</div>

			<Modal.Body className="meeting-details">
				<h1>{meeting.meetingName}</h1>
				<h3>{meeting.meetingDescription}</h3>
				<p>{getDisplayDate()}</p>

				<div className="meeting-details-participants row">
					{getParticipants()}
					{overLimit ? (
						<span className="show-more-meeting-participants super-center" onClick={toggleShowMore}>
							<h6>{expanded ? ('show less') : (`show +${limit}`)}</h6>
						</span> )
						: (<></>)}
				</div>

				<div className="meeting-details-right">
						<Accordion >
							{(meeting.meetingMinutes)
								.map((m) => (
									<Accordion.Item eventKey="0">
										<Accordion.Header>Meeting Minutes</Accordion.Header>
										<Accordion.Body>
											<p>{m.minuteText}</p>
										</Accordion.Body>
									</Accordion.Item>
								))}

						</Accordion>
				</div>


			</Modal.Body>
			<div className="meeting-details-bottom">

			</div>

		</Modal>
		</>
	)
}

export default MeetingDetails;