
import { API_URL } from '../assets/config';
import React, { useState } from 'react';
import axios from 'axios';

function PopupLogin() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error sending the login link');
    }
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Login</button>
      {isOpen && (
        <div className="popup open">
          <div className="popup-content">
            <div className="popup-content--close-button" onClick={togglePopup}>×</div>
            <form className='popup-content--form' onSubmit={handleSubmit}>
              <input
                className='popup-content--form--input'
                placeholder='adres email'
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button className='popup-content--form--button' type="submit">Send login link</button>
            </form>
            {message && <p className="popup-content--message">{message}</p>}
            <div className="popup-content--register-link">
              Nie masz konta? <a href="#">Rejestracja</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupLogin;
