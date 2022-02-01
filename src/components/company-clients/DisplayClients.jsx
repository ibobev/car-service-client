import React from 'react';
import { getRole } from '../../utils/handleAuth';
import { Link } from 'react-router-dom';
const DisplayClients = ({ clients }) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            clients.map(client =>
              <tr key={client.id} className="border-table-item">
                <td>{client.id}</td>
                <td>{client.firstName} {client.lastName} </td>
                <td>{client.email}</td>

                <td>

                  {getRole() === "ROLE_MECHANIC" ? <Link to={`/employee/reports/${client.id}`}>
                    <button className="btn-info"><i className="fas fa-info-circle fa-2x" style={{ color: '#3275e0' }}></i></button>
                  </Link> : <Link to={`/owner/reports/${client.id}`}>
                    <button className="btn-info"><i className="fas fa-info-circle fa-2x" style={{ color: '#3275e0' }}></i></button>
                  </Link>}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default DisplayClients;
