import React, { useEffect, useState } from "react";

// import styles
import "../styles/credentials.css";

// Function to display the credentialslist based on role/ou/division
function CredentialsList() {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch("/credentials", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCredentials(data);
        } else {
          console.error("Failed to fetch credentials");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCredentials();
  }, []);

  // Render the credentials list for the logged in user
  return (
    <div className="credentials-list">
      <h2>My Credentials</h2>
      {/* Display in table for readability */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential) => (
            <tr key={credential._id}>
              <td>{credential.name}</td>
              <td>{credential.username}</td>
              <td>{credential.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CredentialsList;
