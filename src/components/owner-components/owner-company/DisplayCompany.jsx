import React from 'react';
import './display-company.css';

const DisplayCompany = ({company, deleteCompany}) => {


  return (
    
    <div className="wrap-company-details">
      { company.length !== 0 ?(
      <div className="company-details-card">
        <h2>{company.companyName}</h2>
        <p><b>{company.city}</b></p>
        <p><b>{company.createdAt}</b></p>
        <button onClick={() => deleteCompany(company.id)} className="btn-delete-company"><i className="far fa-times-circle fa-2x" style={{color:'#c70000'}}></i></button>
      </div>
       ): <p className="no-details">You have no registered companies!</p>}
    </div>
     
  )
}

export default DisplayCompany;
