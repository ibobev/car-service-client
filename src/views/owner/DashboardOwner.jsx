import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import './dashboard-owner.css';
import NavigationOwner from '../../components/owner-components/owner-navigation/NavigationOwner';
import AccountDetails from '../../components/account-components/AccountDetails';
import DisplayCompany from '../../components/owner-components/owner-company/DisplayCompany';
import RegisterCompany from '../../components/owner-components/owner-company/RegisterCompany';
import AddEmployee from '../../components/owner-components/owner-employees/AddEmployee';
import OwnerCalendar from '../../components/calendar/OwnerCalendar';


const DashboardOwner = () => {
  const [company, setCompany] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchCompanyDetails = async () => {
    const API_URL = "http://localhost:8080/api/v1/company/owner/";
    try {
      let id = getIdFromToken();

      const response = await axios.get(API_URL + id);
      setCompany(response.data);
      //console.log(response.data);
    } catch (error) {
      setCompany([]);
      console.log(error.response);
    }
  }

  const fetchAppointments = async (companyId) => {
    const API_URL = `http://localhost:8080/api/v1/appointments/company/${companyId}`;
    try{
      const response = await axios.get(API_URL);
      setAppointments(response.data);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
    
  }

  const deleteCompany = async (id) => {
    const API_URL = "http://localhost:8080/api/v1/company/"+id;

    try {
      const response = await axios.delete(API_URL);
      console.log(response.data);
      fetchCompanyDetails();
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {

    fetchCompanyDetails();
    if(company.id){
      fetchAppointments(company.id);
    }
    

  }, [company.id]);

  return (
    <div>
      <NavigationOwner />
      <div className="owner-dashboard">
        <div className="profile-owner-container">
          <AccountDetails />
        </div>
        <div className="company-container">
          <DisplayCompany company={company} deleteCompany={deleteCompany} />
          <RegisterCompany fetchDetails={fetchCompanyDetails} />
          <AddEmployee companyId={company.id}/>
        </div>
        <div className="owner-appointments-calendar-container">
          <OwnerCalendar appointments={appointments}/>
        </div>
      </div>

    </div>
  )
}

export default DashboardOwner
