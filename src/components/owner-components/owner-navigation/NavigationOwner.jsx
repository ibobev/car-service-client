import React, { useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
//import './navbar.css';
import logo from '../../../assets/logo/car-service-logo.png'
import { Link } from 'react-router-dom';
import {deleteToken} from '../../../utils/handleAuth';

const OwnerNav = () => (
  <>
    <p><Link to="/owner">Dashboard</Link></p>
    <p><Link to="/owner/employees">Employees</Link></p>
    <p><Link to="/owner/appointments">Appointments</Link></p>
    <p><Link to="/owner/reports">Reports</Link></p>
  </>
);

const NavigationOwner = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const logout = () => {
    deleteToken();
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logo-style" src={logo} alt="logo" />

      </div>
      <div className="navbar-links-container">
        <OwnerNav />
      </div>
      <div className="navbar-link-end">
        <Link to="/login">
          <button onClick={logout} className="btn-sign" type="button">Logout</button>
        </Link>
      </div>
      <div className="navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#f20000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="navbar-menu-container">
            <div className="navbar-menu-container-links">
              <div className="navbar-menu-link-end navbar-link-end">
                <Link to="/login">
                  <button onClick={logout} className="btn-sign" type="button">Logout</button>
                </Link>
              </div>
              <OwnerNav />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationOwner;
