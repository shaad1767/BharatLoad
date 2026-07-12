import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get Driver Profile
export const getDriverProfile = async (id) => {
  const response = await API.get(`/partner/profile/${id}`);

  return response.data;
};

// Get Driver Dashboard
export const getDriverDashboard = async (id) => {
  const response = await API.get(`/partner/dashboard/${id}`);

  return response.data;
};


// Update Driver Profile
export const updateDriverProfile = async (
  id,
  formData
) => {
  const response = await API.put(
    `/partner/profile/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Truck Details
export const updateTruck = async (id, truckData) => {
  const response = await API.put(
    `/driver/truck/${id}`,
    truckData
  );

  return response.data;
};

