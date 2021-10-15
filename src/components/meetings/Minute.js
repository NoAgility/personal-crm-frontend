import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd , MdCheck} from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { Modal, Accordion, Dropdown } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import Cookies from 'js-cookie';
import  './MeetingDetails.css';
import './Meetings.css';
import "../form.css";
import EditMeeting from './EditMeeting';

const Minute = ({ meeting, minute, minuteOptions, author }) => {

	const [isEditingMinute, setIsEditingMinute] = useState(false);
	const [editedMinute, setEditedMinute] = useState('');
	const userID = parseInt(Cookies.get('accountID'));


	const toggleIsEditingMinute = () => {
		if (isEditingMinute) {
			setEditedMinute('');
			setIsEditingMinute(false);
		} else {
			setEditedMinute(minute.minuteText);
			setIsEditingMinute(true);
		}
	}

	const handleEditMinute = (e) => {
		e.preventDefault();
		minuteOptions.onEdit(meeting, {...minute,  "minuteText":editedMinute});
		toggleIsEditingMinute();
	}

	const handleDeleteMinute = () => {
		minuteOptions.onDelete(meeting, minute);
	}

	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    /**
     * Date formatter to change the date to an alias, eg. Today
     * @param {*} date The date to be formatted
     * @returns The formatted date
     */
    const formatDate = (minuteCreation) => {
		let date = new Date(minuteCreation).toLocaleDateString("en-UK", options);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var formattedDate = new Date(0).toLocaleDateString("en-UK", options) === date ? "No deadline" : date;
        formattedDate = tomorrow.toLocaleDateString("en-UK", options) === date ? "Tomorrow" : formattedDate;
        formattedDate = new Date().toLocaleDateString("en-UK", options) === date ? "Today" : formattedDate;
        return formattedDate;
    }


return (<div>
		{isEditingMinute ?
			<form className="app-row" id="edit-minute" onSubmit={(e) => {handleEditMinute(e)}}>
				<textarea
					className="add-minute-text" value={editedMinute}
					onChange={(e) => {setEditedMinute(e.target.value)}}
					form="edit-minute" maxLength={100} required="true" />
					 <div className="app-row">
						<button
							className="message-options invite-accept"
							onClick={onsubmit}>
							<MdCheck/>
						</button>
						<button
							className="message-options invite-decline"
							onClick={() => {toggleIsEditingMinute()}}>
							<MdClose className="edit-minute-cancel-btn"/>
						</button>
					</div>
			</form>
			:
			<div className="minute-content">
				<p>{minute.minuteText}</p>
				{author.accountID === userID ?
				<div className="app-row">
					<p className="minute-date">{formatDate(minute.minuteCreation)}</p>
					<button
						className="message-options invite-accept"
						onClick={() => {toggleIsEditingMinute()}}>
						<FiEdit2/>
					</button>
					<button
						className="message-options invite-decline"
						onClick={() => {handleDeleteMinute()}}>
						<RiDeleteBin6Line/>
					</button>
				</div>
				:
				<div className="app-row">
					<p className="minute-date">{formatDate(minute.minuteCreation)}</p>
					<div className="app-row">
						<ProfilePic
							key={author.accountID}
							name={author.accountName}
							size={"xs"}
							id={author.accountID}
						/>
						<p>{author.accountName}</p>
					</div>
				</div>
				}
			</div>}
	</div>)
}

export default Minute;
