import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    (await login(email, password)) ?? props.onSuccess();
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value.endsWith("@") ? value + "bruss-group.com" : value);
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
      <button
        className="w-2/5 rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
        type="submit"
      >
        zaloguj
      </button>
      {errorMessage && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
