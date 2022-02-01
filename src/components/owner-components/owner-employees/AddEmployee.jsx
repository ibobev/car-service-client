import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddEmployee = ({companyId}) => {

  const [showForm, setShowForm] = useState(false);
  const [btnText, setBtnText] = useState("Add Employee");
  const [btnColor, setBtnColor] = useState("#145ED9");
  const [addMessage, setAddMessage] = useState("");
  const [errorAddMessage, setError] = useState("");

  const showAddEmployeeForm = () => {
    setShowForm(!showForm);
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const changeBtnText = () => {
    if(btnText === "Add Employee"){
      setBtnText("Close");
    }else {
      setBtnText("Add Employee");
    }
  }

  const changeBtnColor = () => {
    if(btnColor === "#145ED9"){
      setBtnColor("#cc0000");
    }else {
      setBtnColor("#145ED9");
    }
  }

  const addEmployee = async (data) => {

    try {
      const response = await axios.post("http://localhost:8080/api/v1/company/"+ companyId + "/employee/" + data.employeeId);
      console.log(response);
      setAddMessage(response.data);
    } catch(error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    addEmployee(data);
  }


  return (
    <div className="register-container">
      {addMessage && (
      <p className="success-message">{addMessage }</p>
      )}
      {errorAddMessage && (
        <p className = "error-message">{errorAddMessage}</p>
      )}
      <div className="btn-show-holder" >
        <button className="btn-show-form" style={{backgroundColor:btnColor}} onClick={() => { showAddEmployeeForm(); changeBtnText(); changeBtnColor();}}>{btnText}</button>
      </div>
      {showForm && (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h2-register-form">Hire Employee</h2>
          <div className="input-container">
            <label className="label-txt">Employee ID</label>
            <input 
              {...register("employeeId", {required:true})}
              className="input-style"
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID..."
            />
            {errors.employeeId && errors.employeeId.type === "required" && <p className="error">Employee ID is required!</p>}
          </div>
          <button className="btn-submit-register" type="submit">Submit</button>
        </form>

      )}

    </div>
    );
};

export default AddEmployee;
