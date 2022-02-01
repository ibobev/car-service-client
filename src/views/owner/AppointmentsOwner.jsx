import React from 'react';
import { useState, useEffect } from 'react';
import NavigationOwner from '../../components/owner-components/owner-navigation/NavigationOwner';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import PendingAppointments from '../../components/appointment/PendingAppointments';
import ActiveAppointments from '../../components/appointment/ActiveAppointments';
import './appointment-owner.css';

const AppointmentsOwner = () => {

  const [company, setCompany] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [activeList, setActiveList] = useState([]);

  const[toggleAppointments, setToggle] = useState(true);
  

  const getCompanyId = async () => {
    const API_URL = "http://localhost:8080/api/v1/company/owner/";
    try {
      let id = getIdFromToken();

      const response = await axios.get(API_URL + id);
      setCompany(response.data);

    } catch (error) {
      setCompany([]);
      console.log(error.response);
    }
  }

  const fetchPendingAppointments = async (cId) => {
    const API_URL = `http://localhost:8080/api/v1/appointments/company/${cId}/pending`;
    try {
      const response = await axios.get(API_URL);
      setPendingList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchActiveAppointments = async (cId) => {
    const API_URL = `http://localhost:8080/api/v1/appointments/company/${cId}/active`;
    try{
      const response = await axios.get(API_URL);
      console.log(response.data);
      setActiveList(response.data);
    }catch(error) {
      console.log(error);
    }
  }

  const acceptAppointment = async (appointmentId) => {
    const API_URL = "http://localhost:8080/api/v1/appointments/" + appointmentId;

    try {
      const response = await axios.post(API_URL);
      console.log(response.data);
      fetchPendingAppointments(company.id);
      fetchActiveAppointments(company.id);
    } catch (error) {
      console.log(error);
    }
  }

  const declineAppointment = async (appointmentId) => {
    const API_URL = "http://localhost:8080/api/v1/appointments/" + appointmentId;

    try {
      const response = await axios.delete(API_URL);
      console.log(response.data);
      fetchPendingAppointments(company.id);
      fetchActiveAppointments(company.id);
    } catch (error) {
      console.log(error);
    }
  }

  const handleToggle = () =>  {
    if(toggleAppointments === true){
      setToggle(false);
    }else {
      setToggle(true);
    }
  }

  useEffect(() => {
    getCompanyId();
    if (company.id) {
      fetchPendingAppointments(company.id);
      fetchActiveAppointments(company.id);
    }
  }, [company.id])

  return (
    <div className="owner-appointments-container">
      <NavigationOwner />

      <div className="display-pending" style={{ display: toggleAppointments ? "block" : "none" }}>
        <h1>Pending Appointments <button onClick={handleToggle} className="btn-neutral"><i className="fas fa-exchange-alt fa-2x toggle-btn"></i></button></h1>
        <div className="appointments-list-container">
          {pendingList.length > 0 ? <PendingAppointments pending={pendingList} accept={acceptAppointment} decline={declineAppointment} /> : <div className="no-appointments-container"><p className="no-appointments-msg">Currently there are no pending appointments!</p><div className="circle-empty-calendar"><i className="fas fa-calendar fa-4x empty-calendar"></i></div></div>}
        </div>
      </div>
      
      <div className="display-active" style={{ display: toggleAppointments ? "none" : "block" }}>
        <h1>Active Appointments <button onClick={handleToggle}  className="btn-neutral"><i className="fas fa-exchange-alt fa-2x toggle-btn"></i></button></h1>
        <div className="appointments-list-container">
          {activeList.length > 0 ? <ActiveAppointments tasks={activeList} /> : <div className="no-appointments-container"><p className="no-appointments-msg">Currently there are no active appointments!</p><div className="circle-empty-calendar"><i className="fas fa-calendar fa-4x empty-calendar"></i></div></div>}
        </div>
      </div>
      
    </div>
  );
};

export default AppointmentsOwner;
