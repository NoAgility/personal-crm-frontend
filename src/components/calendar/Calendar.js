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
	const [height, setHeight] = useState("100%");

	const fetchTasks = () => {
		EventController.fetchTasks().then(res => setTasks(res));
	}
	const fetchMeetings = () => {
		EventController.fetchMeetings().then(res => setMeetings(res));
	}
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
				height={height}/>
				
		</div>
		<AddEventMenu
			fetchTasks={fetchTasks}
			fetchMeetings={fetchMeetings}/>
		</>
	);
}