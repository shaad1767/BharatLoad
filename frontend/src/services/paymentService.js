import axios from "axios";

const API = "http://localhost:5000/api/payment";

export const createOrder = (amount) => {
  return axios.post(`${API}/create-order`, { amount });
};

export const verifyPayment = (data) => {
  return axios.post(`${API}/verify`, data);
};