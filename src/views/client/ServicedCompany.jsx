import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import NavigationClient from '../../components/client-components/client-navigation/NavigationClient';
import DisplayCompanies from '../../components/company-clients/DisplayCompanies';
import './serviced-company.css';

const ServicedCompany = () => {

  const[companyList, setCompanyList] = useState([]);

  const fetchServicedCompany = async () => {
    let clientId = getIdFromToken();

    try{
      const API_URL = "http://localhost:8080/api/v1/company/client/"+clientId;
      const response = await axios.get(API_URL);
      console.log(response.data);
      setCompanyList(response.data);
    } catch(error){
      console.log(error.response);
    }

  }

  useEffect(() => {
    fetchServicedCompany();
  },[]);

  return (
    <div>
      <NavigationClient/>
      <div className="serviced-company-container">
        {companyList.length > 0 ? <DisplayCompanies company={companyList} clientId={getIdFromToken()}/> : <p>No company has serviced you yet!</p>}
      </div>
      
    </div>
  );
};

export default ServicedCompany;
