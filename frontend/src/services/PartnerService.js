import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Driver Partner Registration
export const registerPartner = async (formData) => {
  const response = await API.post(
    "/partner/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get All Partners
export const getAllPartners = async () => {
  const response = await API.get("/partners");
  return response.data;
};

// Get Single Partner
export const getPartnerById = async (id) => {
  const response = await API.get(`/partners/${id}`);
  return response.data;
};

// Delete Partner
export const deletePartner = async (id) => {
  const response = await API.delete(`/partners/${id}`);
  return response.data;
};