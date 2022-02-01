import React from 'react';
import { Link } from 'react-router-dom';

const DisplayCompanies = ({ company, clientId }) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            company.map(c =>
              <tr key={c.id} className="border-table-item">
                <td>{c.id}</td>
                <td>{c.companyName} </td>
                <td>
                  <Link to={`/client/reports/company/${c.id}/${clientId}`}>
                    <button className="btn-info"><i className="fas fa-info-circle fa-2x" style={{ color: '#3275e0' }}></i></button>
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default DisplayCompanies;
