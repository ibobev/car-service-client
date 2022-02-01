import { useState, useEffect } from 'react';
import './account-details.css';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';

const AccountDetails = () => {

  const [details, setDetails] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    const API_URL = "http://localhost:8080/api/v1/accounts/";

    const fetchAccountDetails = async () => {
      try {
        
        let id = getIdFromToken();
        const response = await axios.get(API_URL + id); 
        setDetails(response.data);
        //console.log(response.data);
        setInitial(response.data.firstName.charAt(0));
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchAccountDetails();

  },[]);
  return (
    <div className="wrap-account-details">
      <div className="account-details-card">
        <div className="initial-letter-box">
          <p className="p-center">{initial}</p>
        </div>
        <div className="account-details">
          <div className="names-container">
            <p>{details.firstName} {details.lastName}</p>
          </div>
          <div className="email-container">
            <p>{details.email}</p>
          </div>
        </div>

      </div>
      <div className="border-line"></div>
    </div>
  )
}

export default AccountDetails;
