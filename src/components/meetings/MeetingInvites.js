

import React, { useEffect, useState } from 'react';
import MeetingInviteItem from './MeetingInviteItem';
import { MdAdd, MdClose } from 'react-icons/md';
import { Badge } from 'react-bootstrap';
import "./MeetingInvites.css";
import { RiHome2Line } from 'react-icons/ri';

const MeetingInvitesList = ({ meetings, onAccept, onDecline }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		expanded ? setExpanded(false) : setExpanded(true);
	}

    return (
		<div className={`meeting-invites-container ${expanded ? 'meeting-invites-container-open' : ''}`}>
			<div className='invites-header' >
				<p></p>
				<h2>Invitations</h2>
				<button className="close-invites-btn" onClick={toggleExpanded}>
					<MdClose size={25} colour="white" />
				</button>
			</div>

       		{meetings.map(m =>
				<MeetingInviteItem
					key={m.meetingID}
					onAccept={onAccept}
					onDecline={onDecline}
					meeting={m}
					expanded={expanded}
				/>)}
				<button
					style={meetings.length === 0 ? {display : 'none'} : {display : 'block'}}
					className='toggle-meeting-invites'
					onClick={toggleExpanded}>
					<div>
						<Badge bg="danger">{meetings.length}</Badge>
					</div>
				</button>
    	</div>
	)
}

export default MeetingInvitesList;