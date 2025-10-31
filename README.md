# 🌍 BookIt — Experiences & Slots

**BookIt** is a fullstack travel booking web application where users can explore experiences, view available slots, and complete bookings.
Built with the **MERN Stack + TypeScript**, it demonstrates frontend–backend integration, API design, and deployment best practices.

---

## 🚀 Features

* Explore curated travel experiences with images and details
* View and select available date slots
* Secure checkout flow
* Mock API integrated with Axios
* Responsive UI with Tailwind CSS
* Deployed Backend (Render) + Frontend (Vercel)

---

## 🧩 Tech Stack

**Frontend**

* React + TypeScript
* React Router DOM
* Axios
* Tailwind CSS
* Vite

**Backend**

* Node.js + Express
* TypeScript
* CORS
* Mock API for experiences and booking

---

## ⚙️ Folder Structure

```
bookit/
│
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   └── experienceRoutes.ts
│   │   ├── controllers/
│   │   │   └── experienceController.ts
│   │   └── data/
│   │       └── mockData.json
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   │   └── mockApi.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🧰 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/bookit.git
cd bookit
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
```

Start server:

```bash
npm run dev
```

Your backend should now run at:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE=http://localhost:3000/api
```

Run development server:

```bash
npm run dev
```

Your frontend should now run at:

```
http://localhost:5173
```

---

## 🌐 Deployment Guide

### 🔹 Deploy Backend (Render)

1. Go to [Render](https://render.com/)
2. Create a new **Web Service**
3. Connect your GitHub repo
4. **Root Directory:** `backend`
5. **Build Command:**

   ```
   npm install && npm run build
   ```
6. **Start Command:**

   ```
   npm start
   ```
7. Add environment variable:

   ```
   PORT=10000
   ```
8. Deploy 🎉
   You’ll get a URL like:

   ```
   https://bookit-backend.onrender.com
   ```

---

### 🔹 Deploy Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. **Root Directory:** `frontend`
4. **Build Command:**

   ```
   npm run build
   ```
5. **Output Directory:**

   ```
   dist
   ```
6. Add Environment Variable:

   ```
   VITE_API_BASE=https://bookit-backend.onrender.com/api
   ```
7. Deploy 🎉
   Your site will be live at:

   ```
   https://bookl-cefi.vercel.app/
   ```

---

## 🧾 API Routes

### GET `/api/experiences`

Fetch all experiences.

### GET `/api/experiences/:id`

Fetch single experience details.

### POST `/api/book`

Book a slot for an experience.

---

## 📸 Preview

*(Add screenshots once deployed)*
Example:
![BookIt Home](./assets/home-preview.png)

---

## 🧑‍💻 Author

**Kartikey Upadhyay**
Fullstack Developer | MERN + TypeScript
[GitHub](https://github.com/kartikey116) • [LinkedIn](https://linkedin.com/in/kartikey116)


