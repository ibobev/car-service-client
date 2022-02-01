import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../../components/navbar/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterEmployee = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const watchPassword = watch("password", "");

  const navigate = useNavigate();

  const registerEmployeeAccount = async (data) => {
    const API_URL = "http://localhost:8080/api/v1/employees/register";

    try {
      const response = await axios.post(API_URL, data);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data)
    }


  }

  const onSubmit = (data) => {
    //console.log(data);
    data.roleName = "ROLE_MECHANIC";
    registerEmployeeAccount(data);
  }

  return (
    <div>
      <Navigation />
      <div className="card-wrap">
        <div className="circle">
          <i className="form-icon fas fa-tools fa-5x"></i>
        </div>
        <div className="form-wrap">
          <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
            <h1 className="form-h1">Employee Registration</h1>

            <div className="input-container">
              <label className="label-txt">Select Qualification</label>
              <select
                {...register('qualificationName', { required: true })}
                name="qualificationName"
                type="text"
                id="qualification"
                className="input-style"
                required
              >
                <option value="DIAGNOSTICS">Diagnostics</option>
                <option value="REPAIR">Repair</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>

            </div>

            <div className="input-container">
              <label className="label-txt">Email</label>
              <input
                {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                name="email"
                type="text"
                placeholder="Enter employee email..."
                className="input-style"

              />
              {errors.email && errors.email.type === "required" && <p className="error">Email is required!</p>}
              {errors.email && errors.email.type === "pattern" && <p className="error">Invalid email!</p>}


            </div>


            <div className="input-container">
              <label className="label-txt">First Name</label>
              <input
                {...register('firstName', { required: true, pattern: /^[A-Za-z]+$/ })}
                name="firstName"
                type="text"
                placeholder="Enter employee first name..."
                className="input-style"

              />
              {errors.firstName && errors.firstName.type === "required" && <p className="error">First Name is required!</p>}
              {errors.firstName && errors.firstName.type === "pattern" && <p className="error">First name must contain letters only!</p>}
            </div>
            <div className="input-container">
              <label className="label-txt">Last Name</label>
              <input
                {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/ })}
                name="lastName"
                type="text"
                placeholder="Enter employee last name..."
                className="input-style"
              />
              {errors.lastName && errors.lastName.type === "required" && <p className="error">Last Name is required!</p>}
              {errors.lastName && errors.lastName.type === "pattern" && <p className="error">Last name must contain letters only!</p>}
            </div>


            <div className="input-container">
              <label className="label-txt">Password</label>
              <input
                {...register('password', { required: true, minLength: 5 })}
                name="password"
                type="password"
                placeholder="Enter your password..."
                className="input-style"
              />
              {errors.password && errors.password.type === "required" && <p className="error">Password is required!</p>}
              {errors.password && errors.password.type === "minLength" && <p className="error">Password must be at least 5 character long!</p>}
            </div>
            <div className="input-container">
              <label className="label-txt">Confirm Password</label>
              <input
                {...register('repeatPassword', { required: true, validate: value => value === watchPassword || "Passwords do not match!" })}
                name="repeatPassword"
                type="password"
                placeholder="Confirm your password..."
                className="input-style"

              />
              {errors.repeatPassword && errors.repeatPassword.type === "required" && <p className="error">Repeat password is required!</p>}
              {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}
            </div>

            <div className="form-end">
              <button className="btn-submit" type="submit">Submit</button>
            </div>

          </form>
          <p className="redirect-text">Already have an account? Click <Link to="/login"><span className="link-color">here</span></Link> to login.</p>

        </div>
      </div>

    </div>


  )
}

export default RegisterEmployee;
