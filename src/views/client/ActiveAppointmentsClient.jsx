import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import NavigationClient from '../../components/client-components/client-navigation/NavigationClient';
import './active-appointments-client.css';

const ActiveAppointmentsClient = () => {

  const [activeAppointments, setActiveAppointments] = useState([]);

  const fetchClientAcceptedAppointments = async () => {
    let id = getIdFromToken();
    const API_URL = "http://localhost:8080/api/v1/appointments/client/" + id + "/active";

    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setActiveAppointments(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchClientAcceptedAppointments();
  }, []);

  return (
    <div>
      <NavigationClient />
      <div className="client-active-appointments-wrap">
        <h1 className="client-appointments-header">Accepted Appointments</h1>
        {
          activeAppointments.length > 0 ?
          <div className="active-appointment-container">
            {
              activeAppointments.map(i => {
                return (
                  <div className="appointment-card" key={i.id}>
                    <h2>Appointment Details</h2>
                    <h3>Car Service Company Details</h3>
                    <p><b>ID:</b> {i.carServiceCompany.id}, {i.carServiceCompany.companyName}, {i.carServiceCompany.city}</p>
                    <div className="dashed-border"></div>
                    <h3>Car Details</h3>
                    <p><b>ID:</b> {i.car.id}, {i.car.brand} {i.car.model}, {i.car.year}, {i.car.plateNumber}</p>
                    <div className="dashed-border"></div>
                    <h3>Date and Time</h3>
                    <p><b>{i.date}, {i.startTime}</b></p>
                    <div className="dashed-border"></div>
                    <h3>Status</h3>
                    <p><b>{i.status}</b></p>
                  </div>
                );
              })
            }
          </div>
          : <p className="no-accepted-appointments-msg">Accepted appointments will show up here!</p>
        }
      </div>
    </div>
  );
};

export default ActiveAppointmentsClient;
