import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../../utils/tokenData';
import axios from 'axios';

const EmployeeCompany = () => {
  const [companyDetails, setDetails] = useState([]);
  const [noCompanyDetails, setNoDetails] = useState([]);

  const fetchEmployeeCompanyDetails = async () => {
    const id = getIdFromToken();
    const API_URL = "http://localhost:8080/api/v1/company/employee/" + id;

    try {
      const response = await axios.get(API_URL);
      setDetails(response.data);
      console.log(response.data);
  
    } catch (error) {
      setDetails([]);
      setNoDetails(error.response);
      console.log(error.response);
    }
  }

  useEffect(() => {

    fetchEmployeeCompanyDetails();

  }, []);


  return (
    <div className="details">
      <h2>Associated Company Details</h2>
      <p><b>{companyDetails.companyName}</b></p>
      <p>{companyDetails.city}</p>
      <p>{noCompanyDetails.data}</p>
    </div>
    );
};

export default EmployeeCompany;
