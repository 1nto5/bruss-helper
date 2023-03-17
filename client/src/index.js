import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './pages/home'
import PopupLogin from './components/PopupLogin'
import LoginLinkHandler from './components/LoginLinkHandler';
import DmcheckPro from './pages/dmcheck-pro'
import DmcheckMgmt from './pages/dmcheck-mgmt'
import './assets/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PopupLogin />} />
        <Route path="/auth/:token" element={<LoginLinkHandler />} />
        <Route path="/dmcheck-pro" element={<DmcheckPro />} />
        <Route path="/dmcheck-mgmt" element={<DmcheckMgmt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);