import React from 'react';
import { Link } from 'react-router-dom';
import {getRole} from '../../utils/handleAuth';

const ActiveAppointments = ({tasks}) => {
  return (
    <div className="active-appointment-container">
      {
        tasks.map(i => {
          return(
          <div className="appointment-card" key={i.id}>
            <h2>Appointment Details</h2>
            <h3>Client Details</h3>
            <p><b>ID:</b> {i.account.id}, {i.account.firstName} {i.account.lastName}, {i.account.email}</p>
            <div className="dashed-border"></div>
            <h3>Car Details</h3>
            <p><b>ID:</b> {i.car.id}, {i.car.brand} {i.car.model}, {i.car.year}, {i.car.plateNumber}</p>
            <div className="dashed-border"></div>
            <h3>Date and Time</h3>
            <p><b>{i.date}, {i.startTime}</b></p>
            <div className="dashed-border"></div>
            <h3>Status</h3>
            <p><b>{i.status}</b></p>
            <div className="appointment-card-buttons">
              {getRole() === "ROLE_MECHANIC" ? <Link to={`/employee/tasks/${i.id}`}>
                <button className="btn-appointment">Complete</button>
              </Link> : <Link to={`/owner/tasks/${i.id}`}>
                <button className="btn-appointment">Complete</button>
              </Link>}
              
            </div>
          </div>
        );
      })
      }
    </div>
    );
};

export default ActiveAppointments;
