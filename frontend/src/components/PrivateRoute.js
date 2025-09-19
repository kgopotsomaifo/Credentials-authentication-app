import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from storage

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  // If the user is authenticated, render the child components
  // If not, redirect to the login page
  return authenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
