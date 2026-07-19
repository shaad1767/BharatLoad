import axios from "axios";

const API = axios.create({
  // Direct localhost daal diya hai taaki Render par request na jaye
  baseURL: "http://localhost:5000/api",
});

// Yeh interceptor automatic login token har request me bhejega
API.interceptors.request.use((config) => {
  // Check karo aapne login ke waqt localStorage me kis naam se token save kiya tha
  const token = localStorage.getItem("token"); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const createOrder = (amount) => {
  return API.post("/payment/create-order", { amount });
};

export const verifyPayment = (data) => {
  return API.post("/payment/verify", data);
};