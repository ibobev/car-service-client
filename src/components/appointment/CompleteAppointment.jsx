import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import {getRole} from '../../utils/handleAuth';
import axios from 'axios';
import NavigationEmployee from '../employee-components/employee-navigation/NavigationEmployee';
import NavigationOwner from '../owner-components/owner-navigation/NavigationOwner';
import { useNavigate } from 'react-router-dom';


const CompleteAppointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const params = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointmentDetails] = useState([]);

  const fetchAppointment = async (appointmentId) => {
    const API_URL = "http://localhost:8080/api/v1/appointments/" + appointmentId;

    try {
      const response = await axios.get(API_URL);
      console.log(response);
      setAppointmentDetails(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const completeAppointment = async(appointmentInput) => {
    try {
      const companyId = appointmentInput.companyId;
      const clientId = appointment.account.id;
      const API_URL = "http://localhost:8080/api/v1/company/"+companyId+"/client/"+clientId;
      const response = await axios.post(API_URL);
      console.log(response);
    } catch(error){
      console.log(error);
    }
    
    try{
      const API_URL="http://localhost:8080/api/v1/appointments/"+params.appointmentId;
      const response = await axios.put(API_URL, appointmentInput);
      console.log(response);
      if(getRole() === "ROLE_MECHANIC"){
        navigate("/employee/tasks");
      }else if(getRole() === "ROLE_OWNER"){
        navigate("/owner/appointments");
      }

    }catch(error){
      console.log(error.response);
    }

  }

  const onSubmit = (data) => {
    data.companyId = appointment.carServiceCompany.id;
    console.log(data);
    completeAppointment(data);
  }

  useEffect(() => {
    fetchAppointment(params.appointmentId);
  }, [params.appointmentId]);

  


  return (
    <div>
      {getRole() === "ROLE_MECHANIC" ? <NavigationEmployee /> : <NavigationOwner/>}
      <div className="complete-form-wrap">
        <div className="appointment-details-container">
          {
            <div className="appointment-card" key={appointment.id}>
              <h2>Complete Appointment</h2>
              <h3>Client Details</h3>
              <p><b>ID:</b> {appointment.account?.id}, {appointment.account?.firstName} {appointment.account?.lastName}, {appointment.account?.email}</p>
              <div className="dashed-border"></div>
              <h3>Car Details</h3>
              <p><b>ID:</b> {appointment.car?.id}, {appointment.car?.brand} {appointment.car?.model}, {appointment.car?.year}, {appointment.car?.plateNumber}</p>
              <div className="dashed-border"></div>
              <h3>Date and Time</h3>
              <p><b>{appointment.date}, {appointment.startTime}</b></p>
              <div className="dashed-border"></div>
              <h3>Status</h3>
              <p><b>{appointment.status}</b></p>
              <div className="dashed-border"></div>

              <div className="inside-complete-form-wrap">
                <h2 className="h2-complete-form">Appointment Details</h2>
                <form className="complete-appointment-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-container">
                    <label className="label-txt">Service Price</label>
                    <input
                      {...register("cost", { required: true })}
                      className="input-style"
                      type="number"
                      name="cost"
                      min="1"
                      placeholder="Enter service price..."
                    />
                    {errors.cost && errors.cost.type === "required" && <p className="error">Service price is required!</p>}
                  </div>

                  <div className="input-container">
                    <label className="label-txt">Service Details</label>
                    <textarea
                      {...register("details", { required: true })}
                      className="input-style"
                      rows="4" cols="50"
                      type="text"
                      name="details"
                      placeholder="Enter service details..."
                    />
                    {errors.details && errors.details.type === "required" && <p className="error">Service details are required!</p>}
                  </div>

                  <div className="input-container">
                    <label className="label-txt">Select Service Category</label>
                    <select
                      {...register('serviceCategory', { required: true })}
                      name="serviceCategoty"
                      type="text"
                      id="service-category"
                      className="input-style"
                      required
                    >
                      <option value="INSPECTION">Inspection</option>
                      <option value="ENGINE">Engine</option>
                      <option value="TRANSMISSION">Transmission</option>
                      <option value="SUSPENSION">Suspension</option>
                      <option value="TYRES">Tyres</option>
                      <option value="BRAKES">Brakes</option>
                    </select>

                  </div>

                  <div className="form-end">
                    <button className="btn-submit" type="submit">Complete</button>
                  </div>

                </form>
              </div>

            </div>
          }
        </div>

      </div>

    </div>
  );
};

export default CompleteAppointment;
