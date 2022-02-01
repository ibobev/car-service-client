import React from 'react';
import './home.css'

import Header from '../../components/header/Header';
import RegisterInfoBox from '../../components/home-content/RegisterInfoBox';
import About from '../../components/home-content/About';
import Social from '../../components/social/Social';
import Navigation from '../../components/navbar/Navigation';

const Home = () => {
  return (
    
    <div>
    <Navigation/>
    
    <div id="home" className="landing-page">
    <Header/>
    <RegisterInfoBox/>
    <About/>
    <Social/>
    </div>
    
    </div>
    
  );
}

export default Home;
