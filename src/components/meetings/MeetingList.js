
import React, { useEffect, useState } from 'react';
import MeetingItem from './MeetingItem';
import "./Meetings.css";
const MeetingList = ({meetings, label, editOptions}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    /**
     * Date formatter to change the date to an alias, eg. Today
     * @param {*} date The date to be formatted
     * @returns The formatted date
     */
    const formatDate = (date) => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var formattedDate = new Date(0).toLocaleDateString("en-UK", options) === date ? "No deadline" : date;
        formattedDate = tomorrow.toLocaleDateString("en-UK", options) === date ? "Tomorrow" : formattedDate;
        formattedDate = new Date().toLocaleDateString("en-UK", options) === date ? "Today" : formattedDate;
        return formattedDate;
    }

    const formatPriority = (priority) => {
        let p = priority.toString();
        return p === "-1" ? "No Priority Set" : "Priority: " + p;
    }

    const getLabel = () => {
        if (label === "date") {
            let date = new Date(meetings[0].meetingStart).toLocaleDateString("en-UK", options);
            return formatDate(date)
        }
        // else if (label === "priority") {
        //     return formatPriority(meetings[0].meetingPriority);
        // }
    }
    return (<div className="meetings-section-container">
        <div className="meeting-title">
            <div className="meeting-date">{getLabel()}</div>
        </div>
        {meetings.map(m =>
            <MeetingItem
                key={m.meetingID}
                // onUpdate={editOptions.update}
                // onDelete={editOptions.delete}
                meeting={m}
            />)}
    </div>)
}

export default MeetingList;