# Credentials-authentication-app
Web app designed for managing various credentials across multiple organizational units and divisions within Cool Tech, a fictious tech company. Built using the MERN stack, it includes robust user authentication and role-based access control.

#### Key Features:
- **User Roles:**
  - Normal User: Read credential repository and add new credentials.
  - Management User: Same capabilities as Normal Users, plus update credentials.
  - Admin User: Perform all actions of Normal and Management Users. Assign/unassign users from divisions and OUs, and change user roles.

- **Organisational Units and Divisions:**
  - Predefined OUs and their respective divisions are available (e.g., News Management, Software Reviews).
  - Users can view credentials for their assigned divisions and OUs.

- **Credential Management:**
  - Users can add new credentials to specific repositories.
  - Management and admin users can update existing credentials.

- **User Management:**
  - Admin users can assign/unassign users to/from divisions and OUs.
  - Admin users can change the user role of any user.

### Installation

#### React Frontend
To use the Frontend of this project, React needs to be installed. Follow these steps to install React:
1. Clone the repository: `git clone authentication-app`
2. Navigate to the project directory: `cd authentication-app`
3. Go to the client folder: `cd client` 
4. Install dependencies: `npm install`
5. Start the frontend: `npm start`

#### Backend Setup (Express, MongoDB, Mongoose)
Before you can use the backend of this project, you'll need to install Express and Mongoose. These are essential Node.js packages for creating a server and connecting to a MongoDB database. If you don't have them installed already, follow these steps:
1. Open your terminal or command prompt.
2. Make sure you're in the project's root directory, and then navigate to the `server` directory: `cd server`
3. Initialise a Node.js Project: `npm init -y`
4. Install Express and Mongoose: `npm install express mongoose`
5. Start the backend: `node app.js`

That's it. Now you're ready to use the Authentication App

### Usage
When both the backend and frontend server are started, go to http://localhost:3000 to access the frontend. 
The frontend of the app provides a user-friendly interface with the following components:

- **Login and Registration Pages:** These pages allow users to register or log in. It will take the user to their Dashboard upon successful login, or to the login page upon successful login. These pages are accessed with /login and /registration
- **Dashboard:** After logging in, users will see a dashboard with options like 'Show Credentials' and 'Add Credentials' en for the Admin user there is also and option to 'Update Credentials' and 'Assign Users'. This dashboard can be accessed by going to /dashboard. 
- **Add Credentials:** Users can add new credentials to the selected repository, normal and management users can only add credentials to their own OU and division. Admin users can add credentials to all OUs and divisions.
- **Update Credential:** Admin and Management users can edit and update existing credentials.
- **Assign Users** Admin users have access to a user management page where they can assign users from OUs and divisions and change user roles.
The backend is built using Express and MongoDB with Mongoose for data modeling. It provides the following endpoints:
- **User Authentication Endpoints:** Endpoints for user registration and login. Upon success, provided with a JWT for authentication.
- **Credential Repository Endpoints:** Endpoints for viewing credentials, adding new credentials, and updating credentials. Verify JWT and user permissions before granting access.
- **User Management Endpoints:** Endpoints for assigning/unassigning users to/from divisions and OUs and for changing user roles.

- **Data Modeling:** Database structure to include users, OUs, divisions, and credentials models 
