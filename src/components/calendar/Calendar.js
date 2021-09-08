import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";
export default function Calendar() {
  const events = [{ title: "today's event", date: new Date() }];

  return (
      <div className="calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        height="85vh"/>
    </div>
  );
}