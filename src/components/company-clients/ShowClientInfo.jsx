import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getIdFromToken } from '../../utils/tokenData';
import { useParams } from "react-router-dom";
import { getRole } from '../../utils/handleAuth';
import NavigationOwner from '../owner-components/owner-navigation/NavigationOwner';
import NavigationEmployee from '../employee-components/employee-navigation/NavigationEmployee';

const ShowClientInfo = () => {
  const params = useParams();

  const [appointments, setAppointments] = useState([]);

  const fetchClientAppointmentsInfo = async (clientId) => {
    let companyId;
    let id = getIdFromToken();

    if (getRole() === "ROLE_OWNER") {
      try {
        const API_URL = "http://localhost:8080/api/v1/company/owner/";
        const response = await axios.get(API_URL + id);
        companyId = response.data.id;

      } catch (error) {
        console.log(error);
      }
    }
    else if (getRole() === "ROLE_MECHANIC") {
      try {
        const API_URL = "http://localhost:8080/api/v1/company/employee/" + id;
        const response = await axios.get(API_URL);
        companyId = response.data.id;

      } catch (error) {
        console.log(error.response);
      }
    }

    if (companyId) {
      try {
        const API_URL = "http://localhost:8080/api/v1/appointments/company/" + companyId + "/client/" + clientId;
        const response = await axios.get(API_URL);
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchClientAppointmentsInfo(params.clientId);

  }, [params.clientId, params.companyId]);


  return (
    <div>
      {getRole() === "ROLE_MECHANIC" ? <NavigationEmployee /> : <NavigationOwner />}
      <div className="client-info-container">

        <h1>Client Report</h1>
        <div className="table-info-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{appointments[0]?.account.id}</td>
                <td>{appointments[0]?.account.firstName}</td>
                <td>{appointments[0]?.account.lastName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashed-info-border"></div>
        <h1>Appointment Details</h1>
        <div className="table-info-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Category</th>
                <th>Details</th>
                <th>Car</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments.map(a =>
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.date} </td>
                    <td>{a.category}</td>
                    <td>{a.details}</td>
                    <td>{a.car.brand} {a.car.model}, {a.car.year}, {a.car.plateNumber}</td>
                    <td>&euro;{a.cost}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowClientInfo;
