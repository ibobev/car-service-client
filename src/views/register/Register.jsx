import React from 'react';
import { useState } from 'react';
import './register.css';
import '../form-style.css';
import Navigation from '../../components/navbar/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AccountService from '../../services/AccountService';


const Register = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const watchPassword = watch("password", "");

  const navigate = useNavigate();

  const registerAccount = (registerInput) => {
    AccountService.registerAccount(registerInput).then((response) => {
      console.log(response.data);
      navigate("/login");
    }).catch((error) => {
      setErrorMessage(error.response.data);
      console.log(error.response.data);
    });
  }


  const onSubmit = (data) => {
    //console.log(data);
    registerAccount(data);
  }

  return (
    <div className="register-wrap">
      <Navigation />

      <div className="card-wrap">
        <div className="circle">
          <i className="form-icon fas fa-user-plus fa-5x"></i>
        </div>
        <div className="form-wrap">
          <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
            <h1 className="form-h1">Registration</h1>

            <div className="input-container">
              <label className="label-txt">Select Account Type</label>
              <select
                {...register('roleName', { required: true })}
                name="roleName"
                type="text"
                id="role-type"
                className="input-style"
                required
              >
                <option value="ROLE_CLIENT">Client</option>
                <option value="ROLE_OWNER">Owner</option>
              </select>

            </div>

            <div className="input-container">
              <label className="label-txt">Email</label>
              <input
                {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                name="email"
                type="text"
                placeholder="Enter your email..."
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
                placeholder="Enter your first name..."
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
                placeholder="Enter your last name..."
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
          <p className="redirect-text">Employee account can be registered <Link to="/employees/register"><span className="link-color">here</span></Link>.</p>
          <p className="redirect-text">Already have an account? Click <Link to="/login"><span className="link-color">here</span></Link> to login.</p>
        </div>
      </div>

    </div>
  );
}

export default Register;
