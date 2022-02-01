import React from 'react';
import './dashboard-client.css'
import NavigationClient from '../../components/client-components/client-navigation/NavigationClient';
import AccountDetails from '../../components/account-components/AccountDetails';
import {useState, useEffect} from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';
import RegisterCar from '../../components/client-components/client-cars/RegisterCar';
import DisplayCars from '../../components/client-components/client-cars/DisplayCars';

const DashboardClient = () => {

  const [cars, setCars] = useState([]);

  const fetchClientCars = async () => {
    const id = getIdFromToken();
    const API_URL = "http://localhost:8080/api/v1/car/client/"+id;

    try {
      const response = await axios.get(API_URL);
      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
    
  }

  const deleteCar = async (id) => {
    const API_URL = "http://localhost:8080/api/v1/car/"+id;

    try {
      const response = await axios.delete(API_URL);
      console.log(response.data);
      fetchClientCars();
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {

    fetchClientCars();

  }, []);

  return (
    <div>
      <NavigationClient />
      <div className="client-dashboard">
        <div className="profile-client-container">
        <AccountDetails />
        </div>
        <div className="car-container">
          <DisplayCars car={cars} deleteCar={deleteCar}/>
          <RegisterCar fetchCars={fetchClientCars} />
        </div>
      </div>
    </div>
  )
}

export default DashboardClient;
