import React, { useState } from 'react';
import axios from 'axios';


function PopupLogin() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={togglePopup}>Open Login</button>
      {isOpen && (
        <div className="popup open">
          <div className="popup-content">
            <div className="popup-content--close-button" onClick={togglePopup}>×</div>
            <form className='popup-content--form'>
              <input className='popup-content--form--input' placeholder='adres email' type="email" name="email" required autoFocus/>
              <input className='popup-content--form--input' placeholder='hasło' type="password" name="password" required />
              <button className='popup-content--form--button' type="submit">Zaloguj</button>
            </form>
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
