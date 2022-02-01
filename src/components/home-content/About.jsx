import React from 'react';
import './about.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div id="about">
            <div className="about-container">
                <h2>About the app</h2>
                <p>&#8226; <span className="strong-txt">Clients</span> can browse for a car service company, choose the one that suits their needs and later on <br/> 
                make an appointment with the selected car service.
                </p>
                <br/>
                <p>&#8226; <span className="strong-txt">Company Owners</span> can have WEB presence, thus making their service visible and accessible <br/> to a broader clientele, 
                also having the option to manage their employees with a set of digital management tools.</p>
                <br/>
                <div className="center-txt-container">
                <h3>What are you waiting for?</h3>
                <p>Try the capabilities of the app by creating a free account!</p>
                <Link to="/register">
                <button className="btn-sign add-margin">Register</button>
                </Link>
                </div>
            </div>
            <div className="parallax"></div>
        </div>
    );
}

export default About;
