import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from "views/landing.js";
import Login from "views/login.js";
import Profile from "views/profile";
import Register from "views/register.js";
import Mars from "views/mars-rover.js";
import Earth from "views/earth-imagery.js";
import Apod from "views/apod.js";

const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');
  const tokenExpiration = sessionStorage.getItem('tokenExpiration');

  return token && new Date().getTime() < parseInt(tokenExpiration);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {!isAuthenticated() && (
        <>
          <Route path="/" exact element={<Login />} />
          <Route path="/login-page" exact element={<Login />} />
          <Route path="/register-page" exact element={<Register />} />
        </>
      )}

      {isAuthenticated() && (
        <>
          <Route path="/landing-page" exact element={<Landing />} />
          <Route path="/profile-page" exact element={<Profile />} />
          <Route path="/mars-rover" exact element={<Mars />} />
          <Route path="/earth-imagery" exact element={<Earth />} />
          <Route path="/apod" exact element={<Apod />} />
          <Route path="/" exact element={<Navigate to="/landing-page" />} />
        </>
      )}
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" exact element={<Login />} />
//       <Route path="/landing-page" exact element={<Landing />} />
//       <Route path="/profile-page" exact element={<Profile />} />
//       <Route path="/register-page" exact element={<Register />} />
//       <Route path="/mars-rover" exact element={<Mars />} />
//       <Route path="/earth-imagery" exact element={<Earth />} />
//       <Route path="/apod" exact element={<Apod />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//     <ToastContainer />
//   </BrowserRouter>
// );
