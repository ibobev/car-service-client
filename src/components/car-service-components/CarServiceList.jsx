import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './car-service-list.css';

const CarServiceList = () => {

  const [carServices, setCarServices] = useState([]);

  const fetchCarServices = async () => {
    const API_URL = "http://localhost:8080/api/v1/company/";
    try {

      const response = await axios.get(API_URL);
      setCarServices(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchCarServices();

  }, []);

  return (
    <div className="company-details-wrap">
      <h1>Car Services</h1>
      <div className="company-list-grid">
        {
          carServices.map(company =>
            <div className="company-contianer" key={company.id+company.companyName}>
              <h2>{company.companyName}</h2>
              <p>{company.city}</p>
              <p>{company.createdAt}</p>
              <p>{company.account.firstName} {company.account.lastName}, {company.account.email}</p>
              <Link to={`/client/car-services/${company.id}`}>
                <button className="btn-view">View</button>
              </Link>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default CarServiceList;
