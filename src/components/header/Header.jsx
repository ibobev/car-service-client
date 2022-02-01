import React from 'react';
import './header.css';
import {BsArrowDownCircleFill} from 'react-icons/bs';
import car from '../../assets/home/car.png';
const Header = () => {
    return (
        <>
        <div className="header-landing">
            <h1>Welcome to the car service app</h1>
            <p>Scroll down to find out more</p>
            <a href="#about" className="down-arrow"><BsArrowDownCircleFill/></a>
            <div className="car-img-container">
            <img className="car-img" src={car} alt="Car side view"/>
            </div>
            
        </div>
        </>
    );
}

export default Header;
