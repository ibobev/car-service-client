import React from 'react'
import NavigationClient from '../../components/client-components/client-navigation/NavigationClient';
import CarServiceList from '../../components/car-service-components/CarServiceList';

const CarServiceView = () => {
  return (
    <div>
      <NavigationClient />
      <CarServiceList/>
    </div>
  )
}

export default CarServiceView
