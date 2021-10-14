
import React, { useEffect, useState } from 'react';
import MeetingDetails from './MeetingDetails';
import { Dropdown } from 'react-bootstrap';
import {FiMoreHorizontal} from 'react-icons/fi';
import "./MeetingItem.css";
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import DeleteItem from '../UIComponents/deleteItem/DeleteItem';
import AddMeetingForm from './AddMeetingForm';
import CookieManager from '../../util/CookieManager';

const MeetingItem = ({ meeting, meetingOptions, minuteOptions }) => {

    const minLimit = 5;
	const overLimit = (meeting.meetingParticipants.length > minLimit) ? true : false;
    const [modalShow, setModalShow] = useState(false);
    const [limit, setLimit] = useState(minLimit);


    const handleDelete = () => {
        meetingOptions.onDelete(meeting);
	}

    const handleClose = () => {
        setModalShow(false);
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
		const dateOptions = { month: 'long', day: 'numeric'};
		const timeOptions = {hour: 'numeric', minute: 'numeric'};
		const start = new Date(meeting.meetingStart);
		const end = new Date(meeting.meetingEnd);
		let date = "";
		let time = "\n";
		if (start.getDate() === end.getDate()) {
			date = start.toLocaleDateString("en-UK", dateOptions);
			time += start.toLocaleTimeString("en-UK", timeOptions);
			time += " - ";
			time += end.toLocaleTimeString("en-UK", timeOptions);
		}
		return (<><h6 className="offwhite">{time}</h6></>);
	}

    return <div className="meeting">
            <MeetingDetails
                meeting={meeting}
                show={modalShow}
                onHide={handleClose}
                meetingOptions={meetingOptions}
                minuteOptions={minuteOptions}
		    />

        <div className="meeting-container-left" onClick={() => {if (!modalShow) setModalShow(true)}}>
            <h5>{meeting.meetingName}</h5>
            <div className="meeting-participants-container app-row">
                {getParticipants()}
                {overLimit ? (
                    <span className="show-more-meeting-participants super-center" >
                        <h6>{`+${meeting.meetingParticipants.length - limit} others`}</h6>
                    </span> )
                    : (<></>)}
                    <div className="meeting-item-date">{getDisplayDate()}</div>
            </div>
        </div>

        <Dropdown className="contact-options meeting-item-options" style={{display: `${meeting.meetingCreatorID === parseInt(CookieManager.getCookie('accountID')) ? 'block' : 'none'}`}}>
            <Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
                <FiMoreHorizontal className="modal-header-button" size={28}/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="contact-options-dropdown" variant="dark">
                <Dropdown.Item disabled={meeting.meetingCreatorID === parseInt(CookieManager.getCookie('accountID')) ? false : true }
                    onClick={handleDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
}

export default MeetingItem;