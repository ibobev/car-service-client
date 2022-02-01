import React from 'react';

const PendingAppointments = ({pending, accept, decline}) => {
  

  return (
    <div className="wrap-pending-appointment">
      {
        pending.map(i => {
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
              <button onClick={() => accept(i.id)} className="btn-appointment btn-accept">Accept</button>
              <button onClick={() => decline(i.id)} className="btn-appointment btn-decline">Decline</button>
            </div>
          </div>
        );
      })
      }
    </div>
  );
};

export default PendingAppointments;
