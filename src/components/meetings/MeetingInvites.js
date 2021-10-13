

import React, { useEffect, useState } from 'react';
import MeetingInviteItem from './MeetingInviteItem';
import { MdAdd } from 'react-icons/md';
import { Badge } from 'react-bootstrap';

import "./Meetings.css";
const MeetingInvitesList = ({ meetings, onAccept, onDecline }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		expanded ? setExpanded(false) : setExpanded(true);
	}

    return (
		<div className={`meeting-invites-container ${expanded ? 'invites-container-open' : ''}`}>
			<h2>Invitations</h2>
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
					className={`toggle-meeting-invites ${expanded ? 'toggle-meeting-invites-open' : ''}`}
					onClick={toggleExpanded}>
					<div>
						<h5>
							<Badge bg="danger">{meetings.length}</Badge>
						</h5>
					</div>
				</button>
    	</div>
	)
}

export default MeetingInvitesList;