import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend URL
  withCredentials: true,               // supaya cookie JWT bisa dikirim
});

export default api;
