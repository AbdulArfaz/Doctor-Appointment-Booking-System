# 🩺 DocSlot: Doctor Appointment Booking System

> A comprehensive full-stack, multi-role healthcare web application designed to streamline doctor scheduling, patient interactions, appointment management, and administrative oversight.

---

## 🌐 Live Links

*   *User Frontend:* 👉 [https://doctor-appointment-swart-one.vercel.app](https://doctor-appointment-swart-one.vercel.app)
*   *Admin/Doctor Dashboard:* 👉 [https://doctor-appointment-nmli.vercel.app](https://doctor-appointment-nmli.vercel.app)
*

---

## ✨ Key Features & Capabilities

*   🏥 *Multi-Role Dashboards:* Tailored interfaces for Patients, Doctors, and Administrators.
*   📅 *Appointment Scheduling:* Real-time slot booking, rescheduling, and cancellation management.
*   🔐 *Secure Authentication:* Robust dual-token architecture using *JWT (Access & Refresh Tokens)* paired with *Bcrypt* password hashing.
*   📁 *Cloud File Management:* Seamless profile and document uploads handled via *Multer* and stored securely in *Cloudinary*.
*   ⚡ *Responsive UI:* Fast, dynamic client-side interactions powered by *React, Vite, and React Router*.

---

## 🛠️ Tech Stack & Libraries

### *Frontend & Admin Panels*
*   *React.js* (Component architecture)
*   *Vite* (Next-generation frontend tooling)
*   *React Router* (Client-side routing)

### *Backend & Security*
*   *Node.js & Express.js* (REST API Server)
*   *JWT (JSON Web Tokens)* (Secure Access & Refresh token flow)
*   *Bcrypt* (Secure password hashing & encryption)
*   *Multer* (Multipart/form-data handler for file uploads)
*   *Cloudinary* (Cloud image storage & optimization)

### *Database*
*   *MongoDB & Mongoose* (NoSQL Database & ODM)

---

## 🚀 Deployment & Infrastructure

*   *Frontend & Admin Panels:* Deployed and hosted on *Vercel* with continuous deployment from GitHub.
*   *Backend API:* Hosted as a secure web service on *Render, connected live to **MongoDB Atlas*.

---

## 📁 Project Structure

```text
DocSlot/
│
├── admin/          # Admin and Doctor dashboard application
├── backend/        # Node.js server and API
└── frontend/       # Client-facing web application