import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginModal = (props) => {
  // State to toggle between showing login and registration forms
  const [showRegister, setShowRegister] = useState(false);

  // Handler for clicking outside the modal to close it
  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-background")) {
      props.onClose();
    }
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    props.onClose();
  };

  const handleSuccessRegister = () => {
    setShowRegister(false);
  };

  return (
    // Modal background with click handler to close the modal
    <div
      className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      {/* Modal content */}
      <div className="modal-content w-full max-w-md rounded bg-white p-6 text-center">
        {/* Close button */}
        <button
          className="close-button absolute top-2 right-2 text-2xl"
          onClick={props.onClose}
        >
          &times;
        </button>
        {/* Show login or registration form based on state */}
        {showRegister ? (
          <RegisterForm onSuccessRegister={handleSuccessRegister} />
        ) : (
          <LoginForm onSuccess={handleCloseModal} />
        )}
        {/* Button to toggle between login and registration forms */}
        <button
          className="mt-6  text-gray-800 hover:text-bruss"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Masz konto? Zaloguj się."
            : "Nie masz konta? Kliknij i się zarejestruj."}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
