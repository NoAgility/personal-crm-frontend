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
        <div className="form-container">
            <form>
                <div className="input">
                    <input type="text" className="form-input" value={name} placeholder="Task Name" onChange={event => setName(event.target.value)}/>
                    
                </div>
                <div className="input">
                    <input type="text" className="form-input" value={notes} placeholder="Notes" onChange={event => setNotes(event.target.value)}/>
                </div>
                
                <div>
                    <label className="form-label">Deadline</label>
                    <input className="form-time-input" type="time" value={time} onChange={event => setTime(event.target.value)}/>
                    <input className="form-date-input" type="date" value={date} onChange={event => setDate(event.target.value)}/>
                </div>
            </form>
        </div>
        <div className="buttons">
        <button className="submit" type="submit" onClick={props.submit}>Add</button>
        <button className="cancel" type="cancel" onClick={props.cancel}>Cancel</button>
        </div>
        </React.Fragment>
    ) 
}

export default AddMeetingForm;