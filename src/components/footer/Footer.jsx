import React from 'react';
import './footer.css';
import logo from '../../assets/logo/car-service-logo.png';

const Footer = () => {
  return (
    <footer className="footer-container">
        <img className="logo-style" src={logo} alt="Car Service App logo"/>
        <p> &#169; Car Service App</p>
    </footer>
  );
}

export default Footer
