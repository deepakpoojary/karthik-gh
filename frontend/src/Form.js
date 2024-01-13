import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import Button from '@mui/material/Button';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Table from './Table'
import ResponsiveAppBar from './Navbar'
export default function Form() {
    const labelStyle = { marginBottom: '10px' };
    const [formData, setFormData] = useState({
      name: '',
      choice: 'true',
      birthdate: '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formData)
      // Making a fetch request to the "/submit" route
      await fetch('http://localhost:4000/submit', {//4000 is the backend route 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Submit response:', data);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
        //window.location.href='http://localhost:4000/data'
    };
  
  return (
    <div>
        <ResponsiveAppBar/>
        <div className="form-container">
      <h1> Polling Station <PollOutlinedIcon fontSize="large" style={{ verticalAlign: 'middle', marginBottom: '2px' }}/></h1>
      
      
        <form onSubmit={handleSubmit} method='POST' className="polling-form">
        <label style={{labelStyle}}  className="labelss" htmlFor="name">Name:  </label>
        <input 
          type="text"
          id="name1"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <br />

        <label style={labelStyle} className="labelss" htmlFor="choice">True or False:  </label>
        <select
          id="choice"
          name="choice"
          value={formData.choice}
          onChange={handleInputChange}
          required
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>  

        <br />

        <label style={labelStyle}  className="labelss" htmlFor="birthdate">Pick a date:  </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
          required
        />

        <br />

        <div className="button-container">
        <Button variant="contained" type="submit">submit</Button>
    </div>
        
      </form>
      </div>
    </div>
  )
}
