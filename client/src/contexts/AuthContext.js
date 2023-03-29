import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to not logged in

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      alert("Logged in successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // perform logout logic, e.g. send logout request to server
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
