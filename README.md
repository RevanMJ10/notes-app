# NotesApp

> A full-stack notes application with user authentication, built with React, Node.js, Express, and MongoDB.

---

## Overview

NotesApp is a clean, responsive web application that lets users register, log in, and manage their personal notes. Each user's notes are private and secured behind JWT authentication. The frontend is built with React and styled using Tailwind CSS + DaisyUI, supporting multiple themes out of the box.

---

## Features

- **User authentication** — register and login with hashed passwords (bcrypt) and JWT tokens
- **Private notes** — each note is tied to the authenticated user; no one else can access it
- **Create, edit, delete notes** — full CRUD via modal dialogs
- **Live search** — filter notes by title or content in real time
- **Multiple themes** — light, dark, retro, cyberpunk, valentine, aqua — switchable from the navbar
- **Toast notifications** — success and error feedback on every action
- **Responsive layout** — notes grid adapts from 1 to 3 columns across screen sizes
- **Loading states** — spinner shown while fetching notes

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Axios | HTTP requests to backend API |
| Tailwind CSS + DaisyUI | Styling and UI components |
| Vite | Build tool and dev server |
| jwt-decode | Reading JWT token on client |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| bcrypt | Password hashing |
| jsonwebtoken | JWT generation and verification |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |

---

## Project Structure

```
notes-app/
│
├── backend/
│   ├── controllers/
│   │   ├── noteController.js     # CRUD logic for notes
│   │   └── userController.js     # Register and login logic
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── Notes.js              # Note schema (title, content, userId)
│   │   └── User.js               # User schema (name, email, password)
│   ├── routes/
│   │   ├── noteRoutes.js         # /api/notes — protected CRUD routes
│   │   └── userRoutes.js         # /api/users — register and login
│   ├── .env                      # Environment variables (not committed)
│   ├── package.json
│   └── server.js                 # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar with theme switcher and logout
    │   │   └── NoteCard.jsx      # Individual note card with edit and delete
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Register page
    │   │   └── Notes.jsx         # Main notes dashboard
    │   ├── App.jsx               # Route definitions
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Tailwind imports
    ├── .env                      # VITE_API_URL (not committed)
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## API Reference

### User Routes — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Create a new user account |
| POST | `/login` | No | Login and receive a JWT token |

### Note Routes — `/api/notes`

All note routes require `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | Get all notes for the logged-in user |
| POST | `/` | Yes | Create a new note |
| PUT | `/:id` | Yes | Update an existing note |
| DELETE | `/:id` | Yes | Delete a note |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/RevanMJ10/notes-app.git
cd notes-app
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the Express server (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the backend API |

---

## Author

**Revan MJ** — [LinkedIn](https://linkedin.com/in/revanmj) · [GitHub](https://github.com/RevanMJ10)
