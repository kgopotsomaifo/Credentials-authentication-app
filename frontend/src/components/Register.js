import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import styles
import "../styles/login-register.css";

function Registration({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Send a POST request to register the user
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("Registration successful. You can now log in.");
      // Navigate to login page after successful registration
      navigate("/login");
    } else {
      // Handle registration errors
      console.error("Registration failed");
    }
  };

  // Render register form
  return (
    <div className="loginRegisterForm">
      <h1>Register</h1>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
        {/* link to login page if user doesn't have a login */}
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Registration;
