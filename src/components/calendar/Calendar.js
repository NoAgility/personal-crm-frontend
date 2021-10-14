import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventController from './EventController';
import {useEffect, useState, useRef} from 'react';
import "./Calendar.css";
export default function Calendar() {

	const [publicHolidays, setPublicHolidays] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [height, setHeight] = useState("100%");
	const ref = useRef(false);
	useEffect(() => {
		EventController.fetchPublicHolidays().then(res => setPublicHolidays(res));
		EventController.fetchTasks().then(res => setTasks(res));
		
	}, []);

	return (<React.Fragment>
		<div className = "calendar" >
			<FullCalendar plugins = {[dayGridPlugin]}
				events = {publicHolidays.concat(tasks)}
				eventTimeFormat = {{
					hour: '2-digit',
					minute: '2-digit'
				}}
				initialView='dayGridMonth'
				selectable={true}
				dayMaxEvents={true}
				handleWindowResize={true}
				height={height}
				windowResize={() => {setHeight("100%")}}/>
				
		</div>
		</React.Fragment>
	);
}