import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getIdFromToken } from '../../utils/tokenData';
import DisplayEmployees from '../../components/owner-components/owner-employees/DisplayEmployees';
import NavigationOwner from '../../components/owner-components/owner-navigation/NavigationOwner';
import './employees.css';

const Employees = () => {


  const [employeesList, setEmployeesList] = useState([]);
  const [cId, setCompanyId] = useState("");
  

  const fetchEmployees = async () => {
    let companyId;
    let id = getIdFromToken();
    try {
      const API_URL = "http://localhost:8080/api/v1/company/owner/";
      const response = await axios.get(API_URL + id);
      companyId = response.data.id;
      setCompanyId(companyId);
    } catch (error) {
      console.log(error);
    }

    try {
      const API_URL = "http://localhost:8080/api/v1/company/" + companyId + "/employees"
      const response = await axios.get(API_URL);
      setEmployeesList(response.data);
      console.log(response.data);

    } catch (error) {
      setEmployeesList([]);
      console.log(error.response);
    }
  }

  const deleteEmployee = async(employeeId) => {
    const API_URL = "http://localhost:8080/api/v1/company/"+cId+"/employee/"+employeeId;

    try {
      const response = await axios.delete(API_URL);
      console.log(response.data);
      fetchEmployees();
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {

    fetchEmployees();

  },[]);

  return (
    <div className="employees-view">
      <NavigationOwner />
      <div className="employees-list-container">
        { employeesList.length > 0 ? <DisplayEmployees employees={employeesList} deleteEmployee={deleteEmployee} /> : <p>Currently you have no employees!</p>}
      </div>
    </div>
  )
}

export default Employees;
