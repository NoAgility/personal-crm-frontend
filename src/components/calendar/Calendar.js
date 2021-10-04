import React from "react";
import EventController from "./EventController";
import AddEventMenu from "./AddEventMenu";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";
import Controller from "../registration/RegistrationController";
export default function Calendar() {
  const events = [{
    title: "today's event",
    date: new Date()
  }] //EventController.fetchEvents();

  return ( <React.Fragment><div className = "calendar" >
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