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
        const response = await axios.get(`${API_URL}/auth/login/${token}`);
        setMessage(response.data.message);
        // Here you can set the user's session or JWT in local storage or context
      } catch (error) {
        console.error(error);
        setMessage('Invalid or expired login link');
      }
    };

    login();
  }, [token]);

  return <div>{message}</div>;
}

export default LoginLinkHandler;
