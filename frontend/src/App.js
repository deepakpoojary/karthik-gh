import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import Button from '@mui/material/Button';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Table from './Table'
import Form from './Form'

//using states to track changes to the variables and sending it to backend
function App() {

  return (
    <>
       
        <Routes>

        <Route path="/table" element={<Table/>}/>
        <Route path="/form" element={<Form/>}/>
        </Routes>
                  
       
      
      
      
    </>
  );
}

export default App;