import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mvp.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
//import App from './App';
//import Login from './Login/Login';
import Register from './Register/Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Register/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
