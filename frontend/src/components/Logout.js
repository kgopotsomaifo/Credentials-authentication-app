import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login-register.css";


const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    return Promise.resolve(); // Simulate an async operation
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate("/login"); // Redirect to login page after logout
    });
  };

  return <button className="navigation-bar" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
