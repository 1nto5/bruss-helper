import { API_URL } from '../assets/config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LoginLinkHandler() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get(`${API_URL}/login/${token}`);
        setMessage(response.data.message);

        // Save the user's email to local storage
        localStorage.setItem('userEmail', response.data.email);
      } catch (error) {
        setMessage('Invalid or expired login link');
      }
    };

    login();
  }, [token]);

  return <div>{message}</div>;
}

export default LoginLinkHandler;
