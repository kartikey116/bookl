import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api" || "https://bookltweb.onrender.com/api",
  timeout: 5000,
});
