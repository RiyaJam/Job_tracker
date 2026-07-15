# Job Application Tracker

A full-stack web application to track job applications, built with Node.js, Express, SQLite, and React (Vite).

## Prerequisites

- **Node.js** (v16+ recommended) and **npm** installed on your system.
*(That's it! No complex databases to install).*

## Setup Instructions

### 1. Backend Setup (Node.js + SQLite)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the Node.js server (it will automatically create the SQLite database for you):
   ```bash
   npm start
   ```
   *The backend server will start on `http://localhost:5000`.*

### 2. Frontend Setup (React + Vite)

1. Open a **new terminal** and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically start on `http://localhost:5173` (or `3000`). Click the link in the terminal to open it in your browser.*

## Features

- **Zero-Config Database**: Uses SQLite to store your data locally without any setup.
- **Dashboard**: Quick view of total applications and statuses.
- **CRUD Operations**: Add, Edit, Delete, and View job applications.
- **Filtering**: Easily filter applications by their current status (e.g., Applied, Interview, Offer).
- **Clean UI**: Simple, responsive interface built with Tailwind CSS.
