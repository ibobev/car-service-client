import React from 'react'
import { useState } from 'react';
import '../../../views/common-register-form.css';
import { useForm } from 'react-hook-form';
import { getIdFromToken } from '../../../utils/tokenData';
import axios from 'axios';

const RegisterCompany = ({fetchDetails}) => {

  const [showForm, setShowForm] = useState(false);
  const [btnText, setBtnText] = useState("Register Company");
  const [btnColor, setBtnColor] = useState("#145ED9");
  const [registerMessage, setRegisterMessage] = useState("");
  const [errorRegisterMessage, setError] = useState("");

  const showRegisterForm = () => {
    setShowForm(!showForm);
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const changeBtnText = () => {
    if(btnText === "Register Company"){
      setBtnText("Close");
    }else {
      setBtnText("Register Company");
    }
  }

  const changeBtnColor = () => {
    if(btnColor === "#145ED9"){
      setBtnColor("#cc0000");
    }else {
      setBtnColor("#145ED9");
    }
  }

  const registerCompany = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/company/", data);
      console.log(response);
      setRegisterMessage(response.data);
      fetchDetails();
    } catch(error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  }

  const onSubmit = (data) => {
    data.ownerId = getIdFromToken();
    console.log(data);
    registerCompany(data);
  }

  return (
    <div className="register-container">
      {registerMessage && (
      <p className="success-message">{registerMessage }</p>
      )}
      {errorRegisterMessage && (
        <p className = "error-message">{errorRegisterMessage}</p>
      )}
      <div className="btn-show-holder" >
        <button className="btn-show-form" style={{backgroundColor:btnColor}} onClick={() => { showRegisterForm(); changeBtnText(); changeBtnColor();}}>{btnText}</button>
      </div>
      {showForm && (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h2-register-form">Company Registration</h2>
          <div className="input-container">
            <label className="label-txt">Company Name</label>
            <input 
              {...register("companyName", {required:true})}
              className="input-style"
              type="text"
              name="companyName"
              placeholder="Enter Company Name..."
            />
            {errors.companyName && errors.companyName.type === "required" && <p className="error">Company name is required!</p>}
          </div>
          <div className="input-container">
            <label className="label-txt">City</label>
            <input 
              {...register("city", {required:true})}
              className="input-style"
              type="text"
              name="city"
              placeholder="Enter City..."
            />
            {errors.city && errors.city.type === "required" && <p className="error">City is required!</p>}
          </div>
          <button className="btn-submit-register" type="submit">Submit</button>
        </form>

      )}

    </div>
  )
}

export default RegisterCompany;
