import React, { useState, useEffect, componentDidMount } from 'react';
import "./AddMeetingForm.css";
import "../form.css";
import { MdClose } from 'react-icons/md';
import MeetingController from './MeetingController';
import { Modal } from 'react-bootstrap';
import TaskContactDropdown from '../tasks/TaskContactDropdown';
import ContactController from '../contacts/ContactController';

const AddMeetingForm = ({meeting, submit, show, onHide}) => {

    const [meetingName, setMeetingName] = useState((meeting !== undefined) ? meeting.meetingName : "");
    const [meetingDescription, setMeetingDescription] = useState((meeting !== undefined) ? meeting.meetingDescription : "");
    const [meetingStart, setMeetingStart] = useState((meeting !== undefined) ? meeting.meetingStart : "");
    const [meetingEnd, setMeetingEnd] = useState((meeting !== undefined) ? meeting.meetingEnd : "");
    const [contacts, setContacts] = useState([]);
    const [selectedContactIDs, setSelectedContactIDs] = useState((meeting !== undefined) ? meeting.meetingParticipants : []);

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

    /**
     * Wrapper for onHide function to reset all state
     * @param {*} e The event being triggered
     */
    const handleClose = (e) => {
		e.preventDefault();
		setMeetingName("");
        setMeetingStart("");
        setMeetingEnd("");
		onHide();
	};


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
        <Modal
            show={show}
			onHide={onHide}
            size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
            <div className="close-add-form">
				<MdClose className="close-button" onClick={handleClose} size={30}/>
			</div>
            <Modal.Body>
                <div className="add-form">
                    <form className="form-container">
                        <input
                            type="text"
                            className="form-input"
                            value={meetingName}
                            placeholder="Add Meeting Name"
                            onChange={event => setMeetingName(event.target.value)}
                        />
						<input
                            type="text"
                            className="form-input"
                            value={meetingDescription}
                            placeholder="Add Description"
                            onChange={event => setMeetingDescription(event.target.value)}
                        />
                        <div className="add-meeting-time row">
                                <input
                                    className="form-date-input"
                                    type="date"
                                    value={meetingStart}
                                    onChange={event => setMeetingStart(event.target.value)}
                                />
                                <input
                                    className="form-date-input"
                                    type="time"
                                    value={meetingStart}
                                    onChange={event => setMeetingStart(event.target.value)}
                                />
                                <input
                                    className="form-date-input"
                                    type="time"
                                    value={meetingStart}
                                    onChange={event => setMeetingStart(event.target.value)}
                                />

                                {/* <input
                                    className="form-date-input"
                                    type="date"
                                    value={meetingEnd}
                                    onChange={event => setMeetingEnd(event.target.value)}
                                /> */}
                        </div>
                        <TaskContactDropdown
                            contactItems={contacts}
                            add={addContactSelection}
                            remove={removeContactSelection}/>
                        <button
                            className="meeting-submit"
                            onClick={(e) => {
                                e.preventDefault();
                                onHide();
                                submit({meetingName: meetingName,meetingStart: meetingStart, meetingEnd: meetingEnd, contactIDs: selectedContactIDs})
                                }}>
                            Submit
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddMeetingForm;