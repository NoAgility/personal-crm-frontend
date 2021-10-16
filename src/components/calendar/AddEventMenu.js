import React, { useState } from 'react';
import { BiDotsVerticalRounded, BiPhone, BiTask, BiChevronDown, BiMinus} from 'react-icons/bi';
import { MdGroup, MdClose, MdAdd } from 'react-icons/md';
import './Calendar.css';
import './AddEventMenu.css';
import AddMeetingForm from '../meetings/AddMeetingForm';
import EventController from './EventController';
import AddTaskForm from '../tasks/AddTaskForm';
const AddEventMenu = ({fetchTasks, fetchMeetings}) => {

    const [expand, setExpand] = useState(false);
    const [taskFormShow, setTaskFormShow] = useState(false);
    const [meetingFormShow, setMeetingFormShow] = useState(false);
    /**
     * Toggles expansion of popup menu
     */
    const toggleExpand = () => {setExpand(!expand);};
    

    const addTask = (task) => {
        EventController.addTask(task).then(() => fetchTasks());
    }
    const addMeeting = (meeting) => {
        EventController.addMeeting(meeting).then(() => fetchMeetings());
    }
    return (<div className="mini-menu">
        
        <AddTaskForm
            submit={addTask}
            show={taskFormShow}
            onHide={() => setTaskFormShow(false)}
        />
        <AddMeetingForm
            submit={addMeeting}
            show={meetingFormShow}
            onHide={() => setMeetingFormShow(false)}
        />
        <ul className="menu-ul">
        
        {expand ? 
        <>
            <li>
                <button className="menu-button calendar-add-task" onClick={() => setTaskFormShow(true)}>
                    <BiTask className="menu-icon"/>
                </button>
            </li>
            <li>
                <button className="menu-button calendar-add-meeting" onClick={() => setMeetingFormShow(true)}>
                    <MdGroup className="menu-icon"/>
                </button>
            </li>
        </> : ""}
            <li><button className="menu-button calendar-add-event" onClick={toggleExpand}>
            {expand ? <MdClose className="menu-icon"/> : <MdAdd className="menu-icon"/> }
            </button>
            </li>
        </ul>
    </div>)
}

export default AddEventMenu;