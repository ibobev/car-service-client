import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../../utils/tokenData';
import axios from 'axios';

const EmployeeDetails = () => {

  const [details, setDetails] = useState([]);
  

  const fetchEmployeeDetails = async () => {
    const id = getIdFromToken();
    const API_URL = "http://localhost:8080/api/v1/employees/" + id;

    try {
      const response = await axios.get(API_URL);
      setDetails(response.data);
      console.log(response.data);
  
    } catch (error) {
      setDetails([]);
      console.log(error.response);
    }
  }

  useEffect(() => {

    fetchEmployeeDetails();

  }, []);

  return (
    <div className="details">
      <h2>Account Details</h2>
      <p><b>Employee ID</b> : {details.id}</p>
      {
        details.qualifications?.map(item => 
          <p key={item.id}>{item.qualificationName}</p>
        )
      }
    </div>
  );
};

export default EmployeeDetails;
