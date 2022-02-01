import React from 'react'
import './display-employees.css';

const DisplayEmployees = ({ employees, deleteEmployee }) => {

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Email</th>
            <th>Qualifications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(employee =>
              <tr key={employee.id} className="border-table-item">
                <td>{employee.id}</td>
                <td>{employee.account.firstName} {employee.account.lastName} </td>
                <td>{employee.account.email}</td>
                {employee.qualifications?.map(item => <td key={item.id}> {item.qualificationName} </td>)}
                <td>
                <button onClick={() => deleteEmployee(employee.id)}  className="btn-delete"><i className="far fa-times-circle fa-2x" style={{color:'#c70000'}}></i></button>

                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default DisplayEmployees;
