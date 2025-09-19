import React, { useState, useEffect } from "react";
//Import styles
import "../styles/submit.css";

function AddCredentialsForm({ userOU, userDivision, userRole }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOU, setSelectedOU] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
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

        // If the user is a normal user, populate the OU and Division based on their own assigned values
        // if (userRole === "normal") {
        //   setSelectedOU(userOU);
        //   setSelectedDivision(userDivision);
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDivisions();
    fetchOUs();
  }, [userRole, userOU, userDivision]);

  // Add credential function
  const handleAddCredentials = async (e) => {
    e.preventDefault();
    console.log("handleAddCredentials called");

    // Get token from local storage:
    const token = localStorage.getItem("token");
    // console.log for testing
    console.log("Token:", token);
    console.log("userOU:", userOU);
    console.log("userDivision:", userDivision);
    console.log("userRole:", userRole);
    console.log(selectedDivision);
    console.log(selectedOU);
    if (
      userRole === "admin" ||
      (userOU.includes(selectedOU) && userDivision.includes(selectedDivision))
    ) {
      console.log("User is authorized to add credentials");
      // Make an API call to add credentials to the backend
      const requestBody = {
        name,
        username,
        password,
        ou: selectedOU,
        division: selectedDivision,
      };
      console.log("Request body:", requestBody);

      // Make the POST request
      try {
        const response = await fetch("/credentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        console.log("Response:", response);

        if (response.ok) {
          console.log("Credential added successfully");
          alert("Credential added!");
          // Clear form
          setName("");
          setUsername("");
          setPassword("");
          setSelectedDivision("");
          setSelectedOU("");
        } else {
          console.error("Failed to add credential");
          console.error(await response.text());
        }
      } catch (error) {
        console.error("Error:", error);
        console.log(error.response);
      }
    } else {
      console.error(
        "Permission denied. You can only add credentials to your assigned OU and division."
      );
      alert(
        "Permission denied. You can only add credentials to your assigned OU and division."
      );
    }
  };

  // Render the add credentials form
  return (
    <div className="submit-form">
      <h2>Add Credentials</h2>
      <form onSubmit={handleAddCredentials}>
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

        {/* show ou options */}
        <div className="select-option">
          <select
            value={selectedOU}
            onChange={(e) => setSelectedOU(e.target.value)}
          >
            <option value="" disabled>Select an OU</option>
            {ous.map((ou) => (
              <option key={ou._id} value={ou.name}>
                {ou.name}
              </option>
            ))}
          </select>

          {/* show division options */}
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="" disabled>Select a Division</option>
            {divisions.map((division) => (
              <option key={division._id} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Credential</button>
      </form>
    </div>
  );
}

export default AddCredentialsForm;
