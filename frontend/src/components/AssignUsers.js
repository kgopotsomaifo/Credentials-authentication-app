import React, { useState, useEffect } from "react";

//Import styles
import "../styles/submit.css";

function AssignUsersForm({ users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOU, setSelectedOU] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [ous, setOUs] = useState([]);
  const [divisions, setDivisions] = useState([]);

  // Fetch data from database
  useEffect(() => {
    // Fetch OU data
    const fetchOUs = async () => {
      try {
        const ouResponse = await fetch("/ous", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (ouResponse.ok) {
          const ouData = await ouResponse.json();
          setOUs(ouData);
        } else {
          console.error("Failed to fetch OUs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch Division data
    const fetchDivisions = async () => {
      try {
        const divisionResponse = await fetch("/divisions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (divisionResponse.ok) {
          const divisionData = await divisionResponse.json();
          setDivisions(divisionData);
        } else {
          console.error("Failed to fetch Divisions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOUs();
    fetchDivisions();
  }, []);

  // Functiion to assign users
  const handleAssignUser = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedOU || !selectedDivision || !selectedRole) {
      return;
    }

    // Create an object with the data to be sent to the server
    const data = {
      userId: selectedUser,
      assignedOU: selectedOU,
      assignedDivision: selectedDivision,
      assignedRole: selectedRole,
    };
    console.log(data);

    try {
      // Make the POST request
      const response = await fetch("/users/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Success message
        console.log("User assigned successfully.");
        alert("User assigned!");
      } else {
        // Error message
        console.error("Failed to assign user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Reset the form
    setSelectedUser("");
    setSelectedOU("");
    setSelectedDivision("");
    setSelectedRole("");
  };

  // Render the assign user form
  return (
    <div className="submit-form">
      <h2>Assign Users</h2>
      <form onSubmit={handleAssignUser}>
        {/* show all users to select from  */}
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

        {/* show all ous to select from  */}
        <select
          value={selectedOU}
          onChange={(e) => setSelectedOU(e.target.value)}
        >
          <option value="">Select an OU</option>
          {ous.map((ou) => (
            <option key={ou._id} value={ou.name}>
              {ou.name}
            </option>
          ))}
        </select>

        {/* show all divisions to select from  */}
        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
        >
          <option value="">Select a Division</option>
          {divisions.map((division) => (
            <option key={division._id} value={division.name}>
              {division.name}
            </option>
          ))}
        </select>

        {/* show roles to select from  */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select a Role</option>
          <option value="admin">Admin</option>
          <option value="management">Management</option>
          <option value="normal">Normal</option>
        </select>

        <button type="submit">Assign User</button>
      </form>
    </div>
  );
}

export default AssignUsersForm;
