# 🚀 Dynamic Portfolio Website

A fully dynamic, full-stack portfolio website built using **React, Node.js, MongoDB, and Cloudinary** with secure admin authentication and real-time content management.

---

## 🌟 Features

### 🔹 Frontend

* Modern UI with dark theme and animated background
* Responsive design (mobile + desktop)
* Smooth scroll animations
* Typewriter effect in About section

---

### 🔹 Dynamic CMS System

* Add / Edit / Delete:

  * Experience
  * Skills
  * Projects
  * PDFs (Content Writing)
  * Images (Paintings & Photography)
* Real-time updates from database

---

### 🔹 Authentication

* Secure Admin Login (Email + Password)
* JWT-based authentication
* Admin-only access to CRUD operations

---

### 🔹 File Handling

* PDF and Image upload using **Cloudinary**
* Preview + Download support for PDFs
* Image gallery with view-only access

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication

* JWT (jsonwebtoken)
* bcrypt (password hashing)

### File Storage

* Cloudinary

### Deployment

* Frontend: Netlify
* Backend: Render

---

## ⚙️ Installation (Local Setup)

### 1. Clone Repository

```bash
git clone <your-repo-link>
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Admin Access

Login via:

```text
/email: admin@portfolio.com
/password: admin123
```

---

## 📌 Future Improvements

* Better UI for upload (drag & drop)
* Search & filter system
* Analytics dashboard

---

## 👨‍💻 Author

Manthan Parekh
AI & Data Science Student
FinTech & Data-Driven Solutions Enthusiast

---

## ⭐ Project Goal

To build a **LinkedIn-like dynamic portfolio** with full control over content and real-world deployment architecture.
