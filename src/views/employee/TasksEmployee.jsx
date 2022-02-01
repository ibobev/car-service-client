import React from 'react';
import {useState, useEffect} from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import ActiveAppointments from '../../components/appointment/ActiveAppointments';
import NavigationEmployee from '../../components/employee-components/employee-navigation/NavigationEmployee';
import './tasks-employee.css';

const TasksEmployee = () => {

  const[company, setCompany] = useState([]);
  const[dailyTasks, setDailyTasks] = useState([]);

  const fetchEmployeeCompanyDetails = async () => {
    const id = getIdFromToken();
    const API_URL = "http://localhost:8080/api/v1/company/employee/" + id;

    try {
      const response = await axios.get(API_URL);
      setCompany(response.data);
      console.log(response.data);
  
    } catch (error) {
      setCompany([]);
      console.log(error.response);
    }
  }

  const fetchDailyTasks = async (companyId) => {
    const API_URL = "http://localhost:8080/api/v1/appointments/company/"+companyId+"/today";

    try{
      const response = await axios.get(API_URL);
      console.log(response);
      setDailyTasks(response.data);

    }catch(error) {
      console.log(error.response);
    }
  }

  useEffect(() => {

    fetchEmployeeCompanyDetails();
    if(company.id){
      fetchDailyTasks(company.id);
    }

  }, [company.id]);


  return (
    <div className="employee-tasks-container">
      <NavigationEmployee />
      <h1>Daily Tasks</h1>
      <div className="wrap-active-appointments">
        { dailyTasks.length > 0 ? <ActiveAppointments tasks={dailyTasks}/> : <p className="no-daily-tasks-msg">No daily tasks to disply!</p>}
      </div>
    </div>
  );
};

export default TasksEmployee;
