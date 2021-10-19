
import React, { useEffect, useState } from 'react';
import MeetingInviteDetails from './MeetingInviteDetails';
import { MdCheck, MdClose } from 'react-icons/md';
import "./MeetingItem.css";
import ProfilePic from '../UIComponents/profilePic/ProfilePic';

const MeetingItem = ({ meeting, onAccept, onDecline }) => {

    const [modalShow, setModalShow] = useState(false);

    const handleAccept = () => {
		onAccept(meeting);
		setModalShow(false);
	}

    const handleDecline = () => {
        onDecline(meeting);
		setModalShow(false);
	}

    return (
		<div className="meeting">
			<MeetingInviteDetails
				meeting={meeting}
				show={modalShow}
				onHide={() => {setModalShow(false)}}
				onAccept={onAccept}
				onDecline={onDecline}
		    />

			<div className="meeting-invite-container" onClick={() => {if (!modalShow) setModalShow(true)}}>
				<div>
					<h5>{meeting.meetingName.length < 16 ? meeting.meetingName : meeting.meetingName.substring(0,16).concat(" ...")}</h5>
					<p>{meeting.meetingDescription.length < 25 ? meeting.meetingDescription : meeting.meetingDescription.substring(0,25).concat(" ...")}</p>
				</div>
			</div>
				<div className="app-row">
					<button
						className="message-options invite-accept"
						onClick={handleAccept}>
						<MdCheck/>
					</button>
					<button
						className="message-options invite-decline"
						onClick={handleDecline}>
						<MdClose/>
					</button>

				</div>
		</div>
	)
}

export default MeetingItem;