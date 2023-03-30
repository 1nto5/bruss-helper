import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// TODO account confirmation with email

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mgmtAccess, setMgmtAccess] = useState(false);

  const isTokenExpired = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/auth/is-token-expired",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      setIsLoggedIn(true);
      fetchMgmtAccess(token); // call fetchMgmtAccess after login
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      fetchMgmtAccess(response.data.token); // call fetchMgmtAccess after setting the token
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMgmtAccess(false);
  };

  const fetchMgmtAccess = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/auth/mgmt-access",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMgmtAccess(response.data.dmcheckMgmtAccess);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, mgmtAccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
