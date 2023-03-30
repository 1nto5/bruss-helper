import { API_URL } from "../assets/config";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Toast from "../utils/Toast";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mgmtAccess, setMgmtAccess] = useState(false);

  const isTokenExpired = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/is-token-expired`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      setIsLoggedIn(true);
      fetchMgmtAccess(token); // call fetchMgmtAccess after login
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      fetchMgmtAccess(response.data.token); // call fetchMgmtAccess after setting the token
      toast.success(`Zalogowano!`);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(`Niepoporawne hasło!`);
      }
      if (error.response.status === 404) {
        toast.error(`Nie znaleziono konta!`);
      }
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMgmtAccess(false);
    toast(`Wylogowano!`);
  };

  const register = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      toast.error(`Hasła niezgodne!`);
      return false;
    }

    const validateCompanyEmail = (email) => {
      const emailRegex = /^[a-z]{3,}\.[a-z]{3,}@bruss-group.com$/i;
      return emailRegex.test(email);
    };

    if (!validateCompanyEmail(email)) {
      toast.error(`Niepoprawny email!`);
      return false;
    }

    const validatePassword = (password) => {
      const passwordRegex = /^.*(?=.{6,})(?=.*[!@#$%^&*]).*$/;
      return passwordRegex.test(password);
    };

    if (!validatePassword(password)) {
      toast.error(`Hasło nie spełnia wymagań!`);
      return false;
    }

    try {
      await axios.post(`${API_URL}auth/register`, {
        email,
        password,
      });
      toast.success(`Zarejestrowano!`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(`Konto istnieje!`);
      }
      console.log(error);
      return false;
    }
  };

  const fetchMgmtAccess = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/mgmt-access`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMgmtAccess(response.data.dmcheckMgmtAccess);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, mgmtAccess, login, logout, register }}
    >
      {children}
      <Toast />
    </AuthContext.Provider>
  );
};
