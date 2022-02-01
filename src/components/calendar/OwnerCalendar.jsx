import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const OwnerCalendar = ({appointments}) => {

  
  const today = new Date();

  const appointmentsCompany = appointments.map((i) => {
    return {
      id: i.id,
      title: "STATUS : "+ i.status + " ; Client : " + i.account.firstName+" "+ i.account.lastName + " , Car : " +i.car.brand + " " + i.car.model + ", " + i.car.year,
      startDate: new Date(moment(i.date + " " + i.startTime)),
      endDate: new Date(moment(i.date + " " + i.endTime)),
      allDay:false
    }
  });

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
        events={appointmentsCompany}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 450 }}
      />
    </div>
  );
};

export default OwnerCalendar;
