import React, { useState, useEffect } from 'react';
import "./AddMeetingForm.css";
import "../form.css";
import { MdClose, MdGroup, MdDescription, MdDateRange } from 'react-icons/md';
import { BiBook } from 'react-icons/bi';
import MeetingController from './MeetingController';
import { Modal } from 'react-bootstrap';
import TaskContactDropdown from '../tasks/TaskContactDropdown';
import ContactController from '../contacts/ContactController';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';

const EditMeeting = ({ meeting, show, onHide, meetingOptions, toggleIsEditing }) => {

    const [meetingName, setMeetingName] = useState((meeting !== undefined) ? meeting.meetingName : "");
    const [meetingDescription, setMeetingDescription] = useState((meeting !== undefined) ? meeting.meetingDescription : "");
    const [meetingStart, setMeetingStart] = useState((meeting !== undefined) ? meeting.meetingStart : "");
    const [meetingEnd, setMeetingEnd] = useState((meeting !== undefined) ? meeting.meetingEnd : "");
    const [contacts, setContacts] = useState([]);
    const [selectedContactIDs, setSelectedContactIDs] = useState((meeting !== undefined) ? meeting.meetingParticipants : []);

    const [meetingStartDate, setMeetingStartDate] = useState((meeting !== undefined) ? meeting.meetingStart.substring(0,10) : "");
    const [meetingStartTime, setMeetingStartTime] = useState((meeting !== undefined) ? meeting.meetingStart.substring(19,11) : "");
    const [meetingEndTime, setMeetingEndTime] = useState((meeting !== undefined) ? meeting.meetingEnd.substring(19,11) : "");

    /**
     * Function to add contact to selection
     * @param {*} contact The contact to be added
     */
    const addContactSelection = (contact) => {
        setSelectedContactIDs([...selectedContactIDs, contact.accountID]);
    }

    /**
     * Function to remove contact from the selection
     * @param {*} contact The contact to be removed
     */
    const removeContactSelection = (contact) => {
        const index = selectedContactIDs.indexOf(contact.accountID);
        selectedContactIDs.splice(index, 1);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        meetingOptions.onEdit({...meeting,
            "meetingName": meetingName,
            "meetingDescription": meetingDescription,
            "meetingStart": meetingStart,
            "meetingEnd": meetingEnd,
        });
        toggleIsEditing();
    }

    useEffect(() => {
        setMeetingStart(meetingStartDate + " " + meetingStartTime)
    }, [meetingStartDate, meetingStartTime]);

    useEffect(() => {
        setMeetingEnd(meetingStartDate + " " + meetingEndTime)
    }, [meetingStartDate, meetingEndTime]);

    /**
     * On render, load contacts for them to be addable to the form
     */
    useEffect(() => {

        const getContacts = async () => {
            const ids = await ContactController.fetchContacts();
            let cs =  [];
            if (ids !== undefined && ids.length > 0) {
                for (const id of ids) {
                    let contactData = await ContactController.fetchContactData(id);
                    cs.push(contactData);
                }
                setContacts(cs);
            }
        }

        getContacts();
    }, []);
    return (
        <div className="meeting-details ">
        <form onSubmit={handleEdit}>
        <h3>
            <MdGroup size={25}/>
            <input
                type="text"
                className="form-input"
                value={meetingName}
                placeholder="Add Meeting Name"
                maxLength={45}
                required={true}
                onChange={event => setMeetingName(event.target.value)}
                />
        </h3>
        <h3 className="">
            <MdDescription size={25}/>
            <input
                type="text"
                className="form-input"
                value={meetingDescription}
                placeholder="Add Description"
                maxLength={100}
                onChange={event => setMeetingDescription(event.target.value)}
            />
        </h3>
        <div className="app-row">
            <MdDateRange size={25}/>
            <input
                className="form-date-input"
                type="date"
                value={meetingStartDate}
                required={true}
                onChange={event => setMeetingStartDate(event.target.value)}
            />
            <h4>:</h4>
            <TimePicker
                    colorPalette="dark" theme="classic" withoutIcon={true}
                    onTimeChange={(t) => {setMeetingStartTime(t.hour + ':' + t.minute);setMeetingEndTime(t.hour + ':' + t.minute);}}
                    time={meetingStartTime === '' ? '' : meetingStartTime}
                    timeConfig={{
                        step: 15,
                        unit: 'minute'
                    }}
                />
            <h4>-</h4>
            <TimePicker
                colorPalette="dark" theme="classic" withoutIcon={true}
                onTimeChange={(t) => setMeetingEndTime(t.hour + ':' + t.minute)}
                time={meetingEndTime === '' ? meetingStartTime : meetingEndTime}
                timeConfig={{
                    from: meetingStartTime,
                    to: '23:45',
                    step: 15,
                    unit: 'minute'
                }}
            />
        </div>

        <div className="add-minute-options">
            <div className="row">
                <button
                    className="cancel-btn"
                    onClick={toggleIsEditing}>
                    Cancel
                </button>
                <button
                    className="meeting-submit meeting-btn"
                    type="submit">
                    Change
                </button>
            </div>
        </div>
        </form>
    </div>



    )
}

export default EditMeeting;