import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Create Booking
export const createBooking = async (bookingData) => {
  const response = await API.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

// Get All Bookings
export const getAllBookings = async () => {
  const response = await API.get("/bookings");

  return response.data;
};

// Get Single Booking
export const getBookingById = async (id) => {
  const response = await API.get(`/bookings/${id}`);

  return response.data;
};

// Delete Booking
export const deleteBooking = async (id) => {
  const response = await API.delete(`/bookings/${id}`);

  return response.data;
};
//booking status update
export const updateBookingStatus = async (id, status) => {
  const response = await API.put(
    `/bookings/${id}/status`,
    { status }
  );

  return response.data;
};