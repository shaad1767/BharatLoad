import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",
     userData
    );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};


export const googleLogin = async (token) => {
  const response = await API.post("/auth/google", {
    token,
  });

  return response.data;
};