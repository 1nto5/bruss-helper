import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Toast from "../utils/Toast";
import toast from "react-hot-toast";

export const AuthContext = createContext();

// AuthProvider component to manage authentication state and provide functions for login, logout, and registration
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mgmtAccess, setMgmtAccess] = useState(false);

  // ********************
  const [supervisorList, setSupervisorList] = useState([]);

  // Function to check if the provided token is still valid
  const isTokenValid = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/is-token-valid`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        console.log("Token is expired");
        return false;
      }
    } catch (error) {
      console.log("Error checking token validity:", error);
      return false;
    }
  };

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/extract-username`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch management access information for the user
  // using their token, then update the mgmtAccess state
  const fetchMgmtAccess = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/mgmt-access`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMgmtAccess(response.data.dmcheckMgmtAccess);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to initialize the authentication state when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const initializeAuth = async () => {
      const tokenIsValid = await isTokenValid(token);
      if (tokenIsValid) {
        setIsLoggedIn(true);
        fetchMgmtAccess(token);
        fetchUsername(token); // Add this line
      } else {
        setIsLoggedIn(false);
      }
    };
    if (token) {
      initializeAuth();
    }
  }, []);

  // Function to handle user login, perform validations on the input fields,
  // and send a POST request to the '/auth/login' endpoint with email and password,
  // handle specific error statuses, show appropriate error messages,
  // and return false if the login attempt was unsuccessful
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      fetchMgmtAccess(response.data.token);
      toast.success(`Zalogowano!`);
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        toast.error(`Niepoporawne hasło!`);
      }
      if (error.response.status && error.response.status === 404) {
        toast.error(`Nie znaleziono konta!`);
      }
      console.log(error);
      return false;
    }
  };

  // Function to handle user logout, remove the token from localStorage,
  // set the user as logged out, reset the management access status,
  // and show a toast message indicating successful logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMgmtAccess(false);
    toast(`Wylogowano!`);
  };

  // Function to handle user registration, perform validations on the input fields,
  // and send a POST request to the '/auth/register' endpoint with email and password,
  // handle specific error statuses, show appropriate error messages,
  // and return false if the registration attempt was unsuccessful
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
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
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

  // Return the AuthContext.Provider component with the context values
  // containing the authentication state and functions for managing it
  return (
    <AuthContext.Provider
      value={{
        username,
        isLoggedIn,
        mgmtAccess,
        login,
        logout,
        register,
        supervisorList,
      }}
    >
      {children}
      <Toast />
    </AuthContext.Provider>
  );
};
