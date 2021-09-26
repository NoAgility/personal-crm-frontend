import React, { useState } from 'react';
import "./Task.css";
const AddMeetingForm = (props) => {

    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [contactsListOpen, setContactsListOpen] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <React.Fragment>
        <div className="task-form-container">
            <form>
                <div className="task-input">
                    <input type="text" className="task-form-input" value={name} placeholder="Task Name" onChange={event => setName(event.target.value)}/>

                </div>
                <div className="task-input">
                    <input type="text" className="task-form-input" value={notes} placeholder="Notes" onChange={event => setNotes(event.target.value)}/>
                </div>

                <div>
                    <label className="task-form-label">Deadline</label>
                    <input className="task-form-time-input" type="time" value={time} onChange={event => setTime(event.target.value)}/>
                    <input className="task-form-date-input" type="date" value={date} onChange={event => setDate(event.target.value)}/>
                </div>
            </form>
        </div>
        <div className="task-buttons">
        <button className="task-submit" type="submit" onClick={props.submit}>Add</button>
        <button className="task-cancel" type="cancel" onClick={props.cancel}>Cancel</button>
        </div>
        </React.Fragment>
    )
}

export default AddMeetingForm;