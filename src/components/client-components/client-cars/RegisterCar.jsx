import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getIdFromToken } from '../../../utils/tokenData';

const RegisterCar = ({ fetchCars }) => {

  const [showForm, setShowForm] = useState(false);
  const [btnText, setBtnText] = useState("Register Car");
  const [btnColor, setBtnColor] = useState("#145ED9");
  const [registerMessage, setRegisterMessage] = useState("");
  const [errorRegisterMessage, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const showRegisterForm = () => {
    setShowForm(!showForm);
  }

  const changeBtnText = () => {
    if (btnText === "Register Car") {
      setBtnText("Close");
    } else {
      setBtnText("Register Car");
    }
  }

  const changeBtnColor = () => {
    if (btnColor === "#145ED9") {
      setBtnColor("#cc0000");
    } else {
      setBtnColor("#145ED9");
    }
  }

  const registerCar = async (data) => {
    try {
      const id = getIdFromToken();
      const API_URL = "http://localhost:8080/api/v1/car/client/" + id;
      const response = await axios.post(API_URL, data);
      console.log(response);
      setRegisterMessage(response.data);
      fetchCars();
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  }

  const onSubmit = (data) => {

    console.log(data);
    registerCar(data);
  }

  return (
    <div className="register-container">
      {registerMessage && (
        <p className="success-message">{registerMessage}</p>
      )}
      {errorRegisterMessage && (
        <p className="error-message">{errorRegisterMessage}</p>
      )}
      <div className="btn-show-holder" >
        <button className="btn-show-form" style={{ backgroundColor: btnColor }} onClick={() => { showRegisterForm(); changeBtnText(); changeBtnColor(); }}>{btnText}</button>
      </div>
      {showForm && (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h2-register-form">Car Registration</h2>
          <div className="input-container">
            <label className="label-txt">Brand</label>
            <input
              {...register("brand", { required: true })}
              className="input-style"
              type="text"
              name="brand"
              placeholder="Enter brand..."
            />
            {errors.brand && errors.brand.type === "required" && <p className="error">Brand is required!</p>}
          </div>

          <div className="input-container">
            <label className="label-txt">Model</label>
            <input
              {...register("model", { required: true })}
              className="input-style"
              type="text"
              name="model"
              placeholder="Enter model..."
            />
            {errors.model && errors.model.type === "required" && <p className="error">Model is required!</p>}
          </div>

          <div className="input-container">
            <label className="label-txt">Year</label>
            <input
              {...register("year", { required: true })}
              className="input-style"
              type="text"
              name="year"
              placeholder="Enter year(YYYY)..."
            />
            {errors.year && errors.year.type === "required" && <p className="error">Year is required!</p>}
          </div>

          <div className="input-container">
            <label className="label-txt">Plate Number</label>
            <input
              {...register("plateNumber", { required: true })}
              className="input-style"
              type="text"
              name="plateNumber"
              placeholder="Enter plate number..."
            />
            {errors.plateNumber && errors.plateNumber.type === "required" && <p className="error">Plate number is required!</p>}
          </div>


          <button className="btn-submit-register" type="submit">Submit</button>
        </form>

      )}

    </div>
  )
}

export default RegisterCar;
