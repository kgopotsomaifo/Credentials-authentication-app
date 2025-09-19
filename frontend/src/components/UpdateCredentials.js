import React, { useState } from "react";

//Import styles
import "../styles/submit.css";

// Function for updating credentials
function UpdateCredentialsForm({
  credentials,
  userRole,
  userOU,
  userDivision,
}) {
  const [selectedCredentialId, setSelectedCredentialId] = useState(
    credentials.length > 0 ? credentials[0]._id : ""
  );
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCredentialId(selectedId);
  };

  const handleUpdateCredential = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const requestBody = {
      name,
      username,
      password,
    };
     console.log("Request body:", requestBody);


    try {
      // Find the selected credential based on the selectedCredentialId
      const selectedCredential = credentials.find(
        (credential) => credential._id === selectedCredentialId
      );
      console.log("userOU:", userOU);
      console.log("userDivision:", userDivision);
      if (
        // admin got access to all, management only to their division and ou
        userRole === "admin" ||
        (userRole === "management" &&
          userOU.includes(selectedCredential.ou) &&
          userDivision.includes(selectedCredential.division))
      ) {
        // Make a PUT request
        const response = await fetch(`/credentials/${selectedCredentialId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log("Credential updated successfully");
          // Reset form fields
          setName("");
          setUsername("");
          setPassword("");
          // Success message
          alert("Credentials updated successfully");
          console.error(await response.text());
        } else {
          console.error("Failed to update credential");
        }
      } else {
        alert("You do not have permission to update this credential.");

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Render Update Credential Form
  return (
    <div className="submit-form">
      <h2>Update Credential</h2>

      <form onSubmit={handleUpdateCredential}>
        {/* select an existing credential to change */}
        <select value={selectedCredentialId} onChange={handleSelectChange}>
          <option value="">Select a Credential</option>
          {credentials.map((credential) => (
            <option key={credential._id} value={credential._id}>
              {credential.name}
            </option>
          ))}
        </select>

        {/* change the details to update */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Update Credential</button>
      </form>
    </div>
  );
}

export default UpdateCredentialsForm;
