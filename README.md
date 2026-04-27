# 🎓 Recreating Lecturer Data System From SINTA Website

> Recreating SINTA Website for Informatics Udayana University — Software Engineering Project

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.21-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white)

---

## Overview

A web application that recreates the [SINTA (Science and Technology Index)](https://sinta.kemdikbud.go.id) data system, focused on lecturer profiles for the **Informatics Department, Udayana University**. Built as a Software Engineering course project, this system manages lecturer academic data including profiles, publications, and journal records.

---

## Features

- 👤 **Lecturer Profiles** : Browse and manage lecturer data including name, position, and academic info
- 📄 **Publications & Journals** : View and filter lecturer publication records
- 🔐 **Authentication** : Login system for admin/user access control

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18+, React Router |
| Backend | Node.js 18+, Express 4.x |
| Database | MySQL 8.x |
| Auth | JWT / Session |

---

## Project Structure

```
sinta-recreating/
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
└── backend/           # Express API
    ├── routes/
    ├── controllers/
    ├── models/
    └── package.json
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.x
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sinta-recreating.git
cd sinta-recreating
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sinta_db
JWT_SECRET=your_jwt_secret
```

Import the database:

```bash
mysql -u root -p sinta_db < database/sinta.sql
```

Run the server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/lecturers` | Get all lecturers |
| `GET` | `/api/lecturers/:id` | Get lecturer by ID |
| `GET` | `/api/publications` | Get all publications |
| `GET` | `/api/publications/:lecturerId` | Get publications by lecturer |

---

## Team

> Informatics - Udayana University · Software Engineering Project
> Leonardo Pramudyo Hutomo
> P. Made Hesa Dharma Putra
> I Gusti Ngurah Agus Satria Wibawa
> Kadek Agus Candra Wijaya
> I Kadek Rio Aryan Darmawan

---

*This project is built for educational purposes as part of the Software Engineering course at Udayana University.*
