# Map Integration Project

## Project Description
This project consists of a backend API and a frontend web application for map integration and property management. The backend is built with Node.js, Express, and MongoDB, while the frontend is a React application using Vite, Leaflet, and Google Maps API for interactive map features.

---

## Backend

### Overview
The backend is a RESTful API built with Express.js. It handles user authentication, property data management, image uploads via Cloudinary, and integrates with MongoDB using Mongoose.

### Installation
1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

### Running the Backend
Start the backend server with:
node index.js

or use a process manager like nodemon for development:
nodemon index.js

### Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- multer-storage-cloudinary
- cloudinary
- cors
- dotenv

---

## Frontend

### Overview
The frontend is a React application built with Vite. It provides user interfaces for login, property listing, and admin dashboard, with map integration using Leaflet and Google Maps API.

### Installation
1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

### Running the Frontend
Start the development server with:
npm run dev


### Dependencies
- react
- react-dom
- react-router-dom
- axios
- leaflet
- react-leaflet
- @react-google-maps/api
- js-cookie
- prop-types

### Dev Dependencies
- vite
- eslint and related plugins

---

## Project Structure

/backend
  ├── controller/          # API route controllers
  ├── database/            # Database connection and setup
  ├── middleware/          # Middleware for auth, upload, etc.
  ├── router/              # Express route definitions
  ├── schema/              # Mongoose schemas
  ├── index.js             # Backend entry point
  ├── package.json         # Backend dependencies and scripts

/frontend
  ├── public/              # Static assets
  ├── src/
  │   ├── components/      # React components
  │   ├── css/             # CSS stylesheets
  │   ├── pages/           # React pages
  │   ├── App.jsx          # Main React component
  │   ├── main.jsx         # Frontend entry point
  ├── package.json         # Frontend dependencies and scripts
  ├── vite.config.js       # Vite configuration
  ├── tailwind.config.js   # Tailwind CSS configuration

---

## Author
Aashish
