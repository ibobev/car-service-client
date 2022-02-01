import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getIdFromToken } from '../../utils/tokenData';
import axios from 'axios';

const AppointmentForm = ({ companyId }) => {

  const [registerMessage, setRegisterMessage] = useState("");
  const [errorRegisterMessage, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const createAppointment = async (data) => {
    const API_URL = "http://localhost:8080/api/v1/appointments/";
    try{
      const response = await axios.post(API_URL, data);
      console.log(response);
      setError("");
      setRegisterMessage(response.data);
    }catch(error){
      console.log(error.response.data);
      setRegisterMessage("");
      setError(error.response.data);
    }
  }

  const onSubmit = (data) => {
    data.companyId = companyId
    data.clientId = getIdFromToken();
    console.log(data);
    createAppointment(data);

  }

  return (
    <div className="appointment-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {registerMessage && (
          <p className="success-message">{registerMessage}</p>
        )}
        {errorRegisterMessage && (
          <p className="error-message">{errorRegisterMessage}</p>
        )}
        <h2 className="h2-register-form">Appointment</h2>
        <div className="input-container">
          <label className="label-txt">Date</label>
          <input
            {...register("date", { required: true })}
            className="input-style"
            type="date"
            name="date"
          />
          {errors.date && errors.date.type === "required" && <p className="error">Date is required!</p>}
        </div>

        <div className="input-container">
          <label className="label-txt">Time</label>
          <input
            {...register("startTime", { required: true })}
            className="input-style"
            type="time"
            name="startTime"
            min="08:00" max="20:00"
            step="3600"

          />
          <span className="validity"></span>
          {errors.time && errors.time.type === "required" && <p className="error">Time is required!</p>}
        </div>

        <div className="input-container">
          <label className="label-txt">Car ID</label>
          <input
            {...register("carId", { required: true })}
            className="input-style"
            type="text"
            name="carId"
            placeholder="Enter Car ID..."
          />
          {errors.carId && errors.carId.type === "required" && <p className="error">Car ID is required!</p>}
        </div>

        <button className="btn-submit-register" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
