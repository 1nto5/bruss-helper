import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './pages/home'
import Register from './pages/user/Register'
import PopupLogin from './components/PopupLogin'
import Confirm from './pages/user/Confirm'
import DmcheckPro from './pages/dmcheck-pro'
import DmcheckMgmt from './pages/dmcheck-mgmt'
import './assets/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<PopupLogin />} />
        <Route path="/user/confirm/:token" element={<Confirm />} />
        <Route path="/dmcheck-pro" element={<DmcheckPro />} />
        <Route path="/dmcheck-mgmt" element={<DmcheckMgmt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);