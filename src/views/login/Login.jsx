import React from 'react';
import { useState } from 'react';
import Navigation from '../../components/navbar/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import '../form-style.css';
import './login.css';
import { useForm } from 'react-hook-form';
import { setToken, setRole, getRole } from '../../utils/handleAuth';
import axios from 'axios';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginAccount = async (loginInput) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/accounts/login", loginInput);
      //console.log(response);
      setToken(response.data.token);
      setRole(response.data.role);
      let role = getRole();
      if (role === "ROLE_CLIENT") {
        navigate("/client");
      } else if (role === "ROLE_OWNER") {
        navigate("/owner");
      } else if (role === "ROLE_MECHANIC") {
        navigate("/employee")
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
      setErrorMessage("Incorrect email and/or password!");
    }
  }


  const onSubmit = (data) => {
    //console.log(data);
    loginAccount(data);
  }

  return (
    <div className="login-wrap">
      <Navigation />

      <div className="card-wrap">
        <div className="circle">
          <i className="fas fa-sign-in-alt fa-5x"></i>
        </div>
        <div className="form-wrap">
          <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
            <h1 className="form-h1">Login</h1>
            <div className="input-container">
              <label className="label-txt">Email</label>
              <input
                {...register("email", { required: true })}
                name="email"
                type="text"
                placeholder="Enter your email..."
                className="input-style"
              />
              {errors.email && errors.email.type === "required" && <p className="error">Email is required!</p>}
            </div>
            <div className="input-container">
              <label className="label-txt">Password</label>
              <input
                {...register("password", { required: true })}
                name="password"
                type="password"
                placeholder="Enter your password..."
                className="input-style"
              />
              {errors.password && errors.password.type === "required" && <p className="error">Password is required!</p>}
            </div>

            <div className="form-end">
              <button className="btn-submit" type="submit">Submit</button>
            </div>

          </form>
          <p className="redirect-text">Don't have an account? Click <Link to="/register"><span className="link-color">here</span></Link> to register.</p>
        </div>
      </div>

    </div>
  )
}

export default Login;
