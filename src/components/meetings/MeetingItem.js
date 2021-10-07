
import React, { useEffect, useState } from 'react';
import MeetingDetails from './MeetingDetails';
import { Dropdown } from 'react-bootstrap';
import {FiMoreHorizontal} from 'react-icons/fi';
import "./MeetingItem.css";
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import DeleteItem from '../UIComponents/deleteItem/DeleteItem';
import AddMeetingForm from './AddMeetingForm';

const MeetingItem = ({ meeting, onUpdate, onDelete }) => {

    const [modalShow, setModalShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const handleUpdate = () => {

        setIsEditing(true);
		// onUpdate();
	}

    const handleClose = () => {
        setIsEditing(false);
        setModalShow(false);
	}

    return <div className="meeting">
        {isEditing ?
             <AddMeetingForm
                /*submit={addMeeting}*/
                meeting={meeting}
                show={modalShow}
                onHide={handleClose}
             />
             :
            <MeetingDetails
            meeting={meeting}
            show={modalShow}
            onUpdate={handleUpdate}
			onHide={handleClose}
		/>
}
        <div className="meeting-container-left" onClick={() => {if (!modalShow) setModalShow(true)}}>
            <h5>{meeting.meetingName}</h5>
            <div className="meeting-participants-container row">
                {meeting.meetingParticipants
                    .map((p) => (
                        <ProfilePic
                            name={p.accountName}
                            size={"sm"}
                            id={p.accountID}
                        />
                    ))}
            </div>
        </div>

        <DeleteItem item={meeting} onDelete={onDelete} />
    </div>
}

export default MeetingItem;