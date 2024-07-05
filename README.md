Installation
Prerequisites
Node.js and npm installed
MongoDB instance running
Clone the repository


git clone https://github.com/Ganesh-Gosavi/TaskManager.git
cd TaskManager
Backend Setup
Navigate to the backend directory:



cd backend
Install dependencies:


npm install
Create a .env file and add your environment variables:


MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Start the backend server:

npm start
Frontend Setup
Navigate to the frontend directory:


cd ../frontend
Install dependencies:


npm install
Start the frontend development server:

npm start
The app should now be running on http://localhost:3000 with the backend running on http://localhost:5000.

Usage
Open your browser and navigate to http://localhost:3000.
Register for a new account or log in with an existing account.
Start managing your tasks: create, update, delete, and categorize them as needed.
Features
User authentication (registration and login)
Create, read, update, and delete tasks
Task categorization
Responsive design
Technologies
Frontend:

React.js
Redux
Tailwind CSS
Backend:

Node.js
Express.js
MongoDB
Authentication:

JWT (JSON Web Tokens)
