import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home'
import DmcheckPro from './pages/dmcheck-pro'
import DmcheckMgmt from './pages/dmcheck-mgmt'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dmcheck-pro" element={<DmcheckPro />} />
        <Route path="/dmcheck-mgmt" element={<DmcheckMgmt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);