import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/login", { email });
      alert("Login link sent to your email");
    } catch (error) {
      console.log(error);
    }
  };

  const getProtectedResource = async () => {
    try {
      const response = await axios.get("http://localhost:4000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginLink = async (loginToken) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/login/${loginToken}`
      );
      const token = response.data.token;
      localStorage.setItem("jwt", token);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Use this function to handle login links received in the email
  // You need to call this function with the loginToken from the URL when your app loads
  // const loginToken = getLoginTokenFromURL();
  // handleLoginLink(loginToken);

  const getLoginTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("loginToken");
  };

  useEffect(() => {
    const loginToken = getLoginTokenFromURL();
    if (loginToken) {
      handleLoginLink(loginToken);
    }
  }, []);

  return (
    <div className="App">
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Login Link</button>
        </form>
      ) : (
        <button onClick={getProtectedResource}>Get Protected Resource</button>
      )}
    </div>
  );
};

export default App;
