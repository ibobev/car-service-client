import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import NavigationClient from '../../components/client-components/client-navigation/NavigationClient';
import './car-service-company.css';
import CompanyCalendar from '../calendar/CompanyCalendar';
import AppointmentForm from '../appointment/AppointmentForm';

const CarServiceCompany = () => {
  const params = useParams();

  const [company, setCompany] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [companyError, setCompanyError] = useState("");

  const fetchCompany = async (companyId) => {

    const API_URL = `http://localhost:8080/api/v1/company/${companyId}`;
    try {

      const response = await axios.get(API_URL);
      setCompany(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error.response);
      setCompany(undefined);
      setCompanyError(error.response.data);
    }
  }

  const fetchAppointments = async (companyId) => {
    const API_URL = `http://localhost:8080/api/v1/appointments/company/${companyId}`;
    try{
      const response = await axios.get(API_URL);
      setAppointments(response.data);
      //console.log(response.data);
    }catch(error){
      console.log(error);
    }

  }    

  useEffect(() => {

    if (params.companyId !== undefined) {
      fetchCompany(params.companyId);
      fetchAppointments(params.companyId);
    }
    

  }, [params.companyId]);

  return (
    <div className="csc-details-container">
      <NavigationClient />

      {company !== undefined ? (
        <div className="wrap-details-calendar">
          <div className="wrap-csc-details">
            <div className="csc-card" key={company.id}>
              <div className="icon-box-csc">
                <i className="icon-csc fas fa-warehouse fa-4x"></i>
              </div>
              <h2>{company.companyName}</h2>
              <p><b>{company.city}</b></p>
              <p><b>{company.createdAt}</b></p>
            </div>
            <div className="csc-card" key={company.account?.id}>
              <div className="icon-box-csc">
                <i className="icon-csc fas fa-user-alt fa-4x"></i>
              </div>
              <h2>Company Owner</h2>
              <p><b>{company.account?.firstName} {company.account?.lastName}</b></p>
              <p><b>{company.account?.email}</b></p>
            </div>
          </div>
          <div className="calendar-wrap">
            <CompanyCalendar appointmentList={appointments} />
          </div>
          <div className="appointment-form-wrap">
            <AppointmentForm companyId={params.companyId}/>
          </div>
        </div>

      ) : (<div className="not-found"><h2 className="h2-error">404 {companyError} !</h2></div>)
      }


    </div>
  );
};

export default CarServiceCompany;
