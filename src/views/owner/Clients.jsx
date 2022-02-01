import React from 'react';
import { useState, useEffect } from 'react';
import { getIdFromToken } from '../../utils/tokenData';
import { getRole } from '../../utils/handleAuth';
import axios from 'axios';
import NavigationOwner from '../../components/owner-components/owner-navigation/NavigationOwner';
import NavigationEmployee from '../../components/employee-components/employee-navigation/NavigationEmployee';
import DisplayClients from '../../components/company-clients/DisplayClients';
import './clients.css';


const Clients = () => {

  const [clientsList, setClientsList] = useState([]);

  const fetchClients = async () => {
    let companyId;
    let id = getIdFromToken();

    if (getRole() === "ROLE_OWNER") {
      try {
        const API_URL = "http://localhost:8080/api/v1/company/owner/";
        const response = await axios.get(API_URL + id);
        companyId = response.data.id;

      } catch (error) {
        console.log(error);
      }
    }
    else if (getRole() === "ROLE_MECHANIC") {
      try {
        const API_URL = "http://localhost:8080/api/v1/company/employee/" + id;
        const response = await axios.get(API_URL);
        companyId = response.data.id;

      } catch (error) {
        console.log(error.response);
      }
    }

    if (companyId) {
      try {
        const API_URL = "http://localhost:8080/api/v1/company/" + companyId + "/clients";
        const response = await axios.get(API_URL);
        console.log(response.data);
        setClientsList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
       {getRole() === "ROLE_MECHANIC" ? <NavigationEmployee /> : <NavigationOwner/>}
      <div className="clients-list">
        {clientsList.length > 0 ? <DisplayClients clients={clientsList}/> : <div className="no-clients-container"><p>No clients to display!</p></div> }
      </div>
    </div>
  );
};

export default Clients;
