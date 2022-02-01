import React from 'react';
import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CompanyCalendar = ({ appointmentList }) => {

  
  const appointmentEvents = appointmentList.map((i) => {
    return {
      id: i.id,
      title: "Unavailable",
      startDate: new Date(moment(i.date + " " + i.startTime)),
      endDate: new Date(moment(i.date + " " + i.endTime)),
      allDay:false
    }
  });

  const today = new Date();  

  useEffect(() => {
    //console.log(appointmentEvents)
  }, [appointmentEvents])

  return (
    <div>
      <Calendar
        localizer={localizer}
        views={['month', 'day']}
        min={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            8
          )
        }
        max={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            21
          )
        }
        events={appointmentEvents}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 450 }}
      />
    </div>
  );
};

export default CompanyCalendar;
