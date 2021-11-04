import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventController from './EventController';
import AddEventMenu from './AddEventMenu';
import {useEffect, useState, useRef} from 'react';
import "./Calendar.css";
export default function Calendar() {

	const [publicHolidays, setPublicHolidays] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [meetings, setMeetings] = useState([]);

	/**
	 * Fetch the tasks of the user
	 */
	const fetchTasks = () => {
		EventController.fetchTasks().then(res => setTasks(res));
	}
	/**
	 * Fetch the meetings of the user
	 */
	const fetchMeetings = () => {
		EventController.fetchMeetings().then(res => setMeetings(res));
	}
	/**
	 * On render, fetch all the relevant events
	 */
	useEffect(() => {
		EventController.fetchPublicHolidays().then(res => setPublicHolidays(res));
		EventController.fetchTasks().then(res => setTasks(res));
		EventController.fetchMeetings().then(res => setMeetings(res));
		
	}, []);

	return (<>
		<div className = "calendar" >
			<FullCalendar plugins = {[dayGridPlugin]}
				events = {publicHolidays.concat(tasks).concat(meetings)}
				eventTimeFormat = {{
					hour: '2-digit',
					minute: '2-digit'
				}}
				initialView='dayGridMonth'
				selectable={true}
				dayMaxEvents={true}
				height="100%"/>
				
		</div>
		<AddEventMenu
			fetchTasks={fetchTasks}
			fetchMeetings={fetchMeetings}/>
		</>
	);
}