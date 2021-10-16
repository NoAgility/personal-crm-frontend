import React, { useState } from 'react';
import "./Calendar.css";
import "./EventController";
const AddTaskForm = (props) => {

    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    /**
     * Submit function, called when the user submits the form
     * @param {*} e The triggering event
     */
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="popup-container">
            <form className="form" onSubmit={onSubmit}>
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
                <div className="form-button-container">
                    <button className="form-button-task" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddTaskForm;