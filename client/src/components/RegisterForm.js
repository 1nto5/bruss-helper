import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value.endsWith("@") ? value + "bruss-group.com" : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email and password before submitting the form
    if (!validateEmail(email)) {
      setErrorMessage("Nieporawny email! Podaj właściwy adres służbowy!");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Hasło musi zawierać 6 znaków, w tym 1 specjalny!");
      return;
    }

    // Reset the error message
    setErrorMessage("");

    (await register(email, password, repeatPassword)) ??
      props.onSuccessRegister();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-z]{3,}\.[a-z]{3,}@bruss-group.com$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.*(?=.{6,})(?=.*[!@#$%^&*]).*$/;
    return passwordRegex.test(password);
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <input
        className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
        type="email"
        id="email"
        placeholder="adres email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
        type="password"
        id="password"
        placeholder="hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
        type="password"
        id="repeatPassword"
        placeholder="powtórz hasło"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />
      <button
        className="w-2/5 rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
        type="submit"
      >
        zarejestruj
      </button>
      {errorMessage && (
        <p className="mt-2 font-medium  tracking-wider text-red-600">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
