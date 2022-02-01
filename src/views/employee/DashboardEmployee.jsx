import React from 'react';
import './dashboard-employee.css';
import AccountDetails from '../../components/account-components/AccountDetails';
import NavigationEmployee from '../../components/employee-components/employee-navigation/NavigationEmployee';
import EmployeeDetails from '../../components/employee-components/employee-details/EmployeeDetails';
import EmployeeCompany from '../../components/employee-components/employee-details/EmployeeCompany';

const DashboardEmployee = () => {

  return (
    <div className="employee-dashboard">
      <NavigationEmployee />
      <div className="profile-employee-container">
        <AccountDetails />
      </div>
      <div className="employee-details-container">
        <EmployeeDetails />
        <EmployeeCompany />
      </div>
    </div>
  )
}

export default DashboardEmployee
