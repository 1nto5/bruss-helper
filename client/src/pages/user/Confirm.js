import { API_URL } from '../../assets/config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Confirm = () => {
  const [message, setMessage] = useState('');
  const routeParams = useParams();
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/confirm?token=${routeParams.token}`);
        setMessage(response.data.message);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage('Something went wrong. Please try again later.');
        }
      }
    };

    confirmAccount();
    console.log(routeParams.token)
  }, [routeParams.token]);

  return (
    <div>
      <h2>Confirm Account</h2>
      <p>{message}</p>
    </div>
  );
};

export default Confirm;