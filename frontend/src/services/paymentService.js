import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const createOrder = (amount) => {
  return API.post("/payment/create-order", { amount });
};

export const verifyPayment = (data) => {
  return API.post("/payment/verify", data);
};