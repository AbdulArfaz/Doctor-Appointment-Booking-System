🩺 DocSlot — Doctor Appointment Booking System

DocSlot is a full-stack, multi-role healthcare web application built using the MERN stack. It simplifies doctor appointment scheduling and management by providing dedicated interfaces for patients, doctors, and administrators.

🌐 Live Demo

-*   DocSlot Live URL: 👉 [https://doctor-appointment-swart-one.vercel.app](https://doctor-appointment-swart-one.vercel.app)
- Frontend: Deployed on Vercel
- Backend API: Deployed on Render

✨ Key Features

- Multi-Role Dashboards: Dedicated interfaces for patients, doctors, and administrators.
- Appointment Management: Book, view, and manage doctor appointments.
- Doctor Management: Admins can add doctors and manage doctor information.
- Authentication & Authorization: JWT-based authentication with access and refresh tokens.
- Secure Password Storage: Password hashing using bcrypt.
- Profile Management: Manage user and doctor profile information.
- Cloud File Uploads: Upload profile images using Multer and Cloudinary.
- Responsive Interface: Built with React and Vite for a smooth user experience.
- Client-Side Routing: Navigate between patient and staff pages using React Router.

🛠️ Tech Stack

Frontend

- React.js
- Vite
- React Router
- JavaScript
- Tailwind CSS

Backend

- Node.js
- Express.js
- REST APIs
- JSON Web Tokens (JWT)
- Bcrypt
- Multer

Database & Storage

- MongoDB
- Mongoose
- Cloudinary

Deployment & Tools

- Vercel — Frontend hosting
- Render — Backend hosting
- MongoDB Atlas — Cloud database
- Git & GitHub — Version control

🏗️ Application Architecture

DocSlot follows a MERN-based architecture with a unified frontend and a separate backend API.

- Frontend: Contains the patient-facing interface, staff login, admin dashboard, and doctor dashboard.
- Backend: Handles authentication, authorization, appointment operations, doctor management, and database interactions.
- Database: MongoDB stores application data, managed through Mongoose.
- Cloud Storage: Cloudinary stores uploaded images and supported media.

📁 Project Structure

DocSlot/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   └── Doctor/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── db/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── package.json
    └── server.js

