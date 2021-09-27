import React, { useState } from 'react';
import "./Tasks.css";
import "../form.css";
import { MdClose } from 'react-icons/md';
import TaskController from './TaskController';
import { Modal } from 'react-bootstrap';
const AddMeetingForm = ({submit, show, onHide}) => {

    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [contactsListOpen, setContactsListOpen] = useState(false);

    const handleClose = (e) => {
		e.preventDefault();
		setName("");
		onHide();
	}
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

                <h1>Add a Task</h1>
            
                <div className="add-form">
                    <form className="form-container">
                        <input type="text" className="form-input" value={name} placeholder="Task Name" onChange={event => setName(event.target.value)}/>
                        <input type="text" className="form-input" value={notes} placeholder="Notes" onChange={event => setNotes(event.target.value)}/>
                        <label className="task-form-label">Deadline</label>
                        <input className="task-form-time-input" type="time" value={time} onChange={event => setTime(event.target.value)}/>
                        <input className="task-form-date-input" type="date" value={date} onChange={event => setDate(event.target.value)}/>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddMeetingForm;