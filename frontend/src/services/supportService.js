import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Get Support Details
export const getSupportDetails = async () => {
  const response = await API.get("/support");
  return response.data;
};