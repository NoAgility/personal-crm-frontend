import React from "react";
import AddEventMenu from "./AddEventMenu";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";
export default function Calendar() {

  const events = [{
    title: "today's event",
    date: new Date()
  }] //EventController.fetchEvents();

  return ( <React.Fragment><div className = "calendar" >
    <h2>This page is currently under maintenance and features are not working</h2>
    <FullCalendar
    plugins = {
      [dayGridPlugin]
    }
    events = {
      events
    }
    height = "85vh"/>
    
    </div>
    <AddEventMenu/>
    </React.Fragment>
  );
}