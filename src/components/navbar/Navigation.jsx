import React, {useState} from 'react';
import {RiCloseLine, RiMenu3Line} from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/logo/car-service-logo.png'

import {Link} from 'react-router-dom';

const Menu = () => (
  <>
  <p><Link to="/">Home</Link></p>
  <p><a href="/#discover">Discover</a></p>
  <p><a href="/#about">About</a></p>
  <p><Link to="/register">Register</Link></p>

  </>
);

const Navigation = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logo-style" src={logo} alt="logo"/>
        
      </div>
      <div className="navbar-links-container">
          <Menu/>
      </div>
      <div className="navbar-link-end">
        <Link to="/login">
        <button className="btn-sign" type="button">Login</button>
        </Link>
      </div>
      <div className="navbar-menu">
        {toggleMenu
          ?<RiCloseLine color="#f20000" size={27} onClick={() => setToggleMenu(false)} />
          :<RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="navbar-menu-container">
            <div className="navbar-menu-container-links">
            <div className="navbar-menu-link-end navbar-link-end">
                <Link to="/login">
                <button className="btn-sign" type="button">Login</button>
                </Link>
              </div>
              <Menu />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
