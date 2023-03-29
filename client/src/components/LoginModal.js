import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthProvider } from "../contexts/AuthContext";

const LoginModal = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-background")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="modal-content w-full max-w-md rounded bg-white p-6">
        <button
          className="close-button absolute top-2 right-2 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {showRegister ? (
          <RegisterForm />
        ) : (
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        )}
        <button
          className="mt-4 text-blue-600"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Already have an account? Log in"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
