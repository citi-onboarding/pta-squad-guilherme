import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  timeout: 10000, //tempo maximo
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
