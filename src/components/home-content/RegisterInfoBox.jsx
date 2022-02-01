import React from 'react';
import { Link } from 'react-router-dom';
import './register-info-box.css';


const RegisterInfoBox = () => {
    return (
        <div id="discover" className="register-info">
      <div className="info-box-container">
        <div className="icon-box">
          <i className="fas fa-warehouse fa-5x fas-register"></i>
        </div>
        <div className="text-box">
          <h1>Owning a car service company?</h1>
          <p>Let potential customers find you within a few clicks!</p>
          <Link to="/register">
          <button className="button-reg" type="button">Register</button>
          </Link>
        </div>
      </div>
      <div className="info-box-container">
        <div className="icon-box">
          <i className="fas fa-car-crash fa-5x fas-register"></i>
        </div>
        <div className="text-box">
          <h1>Having car trouble?</h1>
          <p>Find the car service that meets your needs!</p>
          <Link to="/register">
          <button className="button-reg" type="button">Register</button>
          </Link>
        </div>
      </div>
    </div>
    )
}

export default RegisterInfoBox;
