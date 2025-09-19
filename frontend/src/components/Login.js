import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login-register.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage("");

    const requestBody = {
      username,
      password,
    };

    // fetch backend /login to get token for authentication
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("API URL:", response.url);

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        console.log("Successfully logged in! Navigating to dashboard...");
        navigate("/dashboard");
      } else {
        // Handle login failure
        setLoginMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessage("An error occurred. Please try again later.");
    }
  };

  // Render login form
  return (
    <div className="loginRegisterForm">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* link to register page if user doesn't have a login */}
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
      {loginMessage && <p>{loginMessage}</p>}{" "}
      {/* Display login message if available */}
    </div>
  );
}

export default Login;
