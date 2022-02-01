import React from 'react';
import './display-cars.css';

const DisplayCars = ({ car, deleteCar }) => {
  return (
    <div>
      {
        car.length !== 0 ? (
          <div className="cars-wrap">
            {
              car.map(c =>
                <div className="car-details-container" key={c.id}>
                  <h2>{c.plateNumber}</h2>
                  <p>{c.brand} {c.model}, {c.year}</p>
                  <p><b>ID:</b> {c.id}</p>
                  <button onClick={() => deleteCar(c.id)} className="btn-delete-car"><i className="far fa-times-circle fa-2x" style={{color:'#c70000'}}></i></button>
                </div>
                )
            }
          </div>
        ) : <p className="no-details">You have no registered cars!</p>

      }


    </div>
  )
}

export default DisplayCars;
