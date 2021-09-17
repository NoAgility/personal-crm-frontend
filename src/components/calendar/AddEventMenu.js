import React, { useState } from 'react';
import { BiDotsVerticalRounded, BiPhone, BiTask, BiChevronDown, BiMinus} from 'react-icons/bi';
import './Calendar.css';
import AddMeetingForm from './AddMeetingForm';
import AddTaskForm from './AddTaskForm';
const AddEventMenu = () => {

    const [expand, setExpand] = useState(false);
    const [form, setForm] = useState(null);
    const toggleExpand = () => {setExpand(!expand);};
    const toggleForm = (formName) => {setForm(formName);}
    const closeForm = () => setForm(null);
    return (<div className="mini-menu">
        
        {form === "newMeeting" ? <AddMeetingForm/> : ""}
        {form === "newTask" ? <AddTaskForm/> : ""}
        <ul className="menu-ul">
        
        {form === null && expand ? 
        <React.Fragment>
            <li>
                <button className="menu-button" onClick={() => toggleForm("newTask")} style={{"backgroundColor": "#993399"}}>
                    <BiTask className="menu-icon"/>
                </button>
            </li>
            <li>
                <button className="menu-button" onClick={() => toggleForm("newMeeting")} style={{"backgroundColor":"#c7963c"}}>
                    <BiPhone className="menu-icon"/>
                </button>
            </li>
        </React.Fragment> : ""}
            <li>{form === null ? <button style={{"backgroundColor":"#339966"}}className="menu-button" onClick={toggleExpand}>
            {expand ? <BiChevronDown className="menu-icon"/> 
                : form === null ? <BiDotsVerticalRounded className="menu-icon"/> 
                    : <BiMinus className="menu-icon"/>}
                </button> 
                : <button style={{"backgroundColor":"#339966"}}className="menu-button" onClick={closeForm}>
                    <BiMinus className="menu-icon"/>
                </button>}
            </li>
        </ul>
    </div>)
}

export default AddEventMenu;