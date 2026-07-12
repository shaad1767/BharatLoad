import React, { useEffect, useState } from "react";
import { getAllBookings, deleteBooking } from "../services/bookingService";
import { Trash2, Truck, CreditCard, MapPin, CalendarDays, Phone, User } from "lucide-react";
import { createOrder, verifyPayment } from "../services/paymentService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBooking(id);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
const handlePayment = async (booking) => {

  console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  // 1. Backend se Razorpay order create karo
  const res = await createOrder(booking.price);
  const order = res.data;

  console.log("ORDER:", order); // ✅ yahi debug line hai


  // 2. Razorpay Checkout
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    name: "Truck Booking",
    description: "Truck Booking Payment",
    order_id: order.id,

    handler: async function (response) {
        alert("HANDLER TRIGGERED"); // 👈 test
    console.log("RESPONSE:", response); // 👈 YAHAN lagao

  try {
    await verifyPayment({
      ...response,
      booking: booking,
    });

    alert("Payment Successful");
  } catch (err) {
    console.log(err);
    alert("Payment Failed");
  }
},
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white animate-pulse">
          Loading Orders...
        </h1>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          🚚 No Orders Found
        </h1>
      </div>
    );
  }

  return (
         <>
     <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 pt-28 px-5 pb-10">

  <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2">
    My Orders
  </h1>

  <p className="text-center text-gray-500 mb-10">
    Track all your truck bookings in one place
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="
                 bg-white
                rounded-2xl
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                border
                border-gray-100
                overflow-hidden
                max-w-sm
                mx-auto
                w-full
                "
               >

           <div className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white p-4 flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow">

                  <Truck className="text-black" size={24} />

                </div>

                <div>

                  <h2 className="text-lg font-bold tracking-wide">
                    {booking.truck}
                  </h2>

                  <p className="text-xs text-gray-300">
                    Booking ID : #{booking._id.slice(-6)}
                  </p>

                </div>

              </div>
                  <div className="p-4 text-black space-y-4">
                    
              <div className="flex items-center gap-3">
                <User size={18}/>
                <span>{booking.customerName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18}/>
                <span>{booking.phone}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18}/>
                <span>
                  <strong>Pickup:</strong><br/>
                  {booking.pickup}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18}/>
                <span>
                  <strong>Drop:</strong><br/>
                  {booking.drop}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={18}/>
                <span>{booking.date}</span>
              </div>

              <hr className="border-gray-200"/>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-gray-400 text-sm">
                    Distance
                  </p>

                  <h3 className="text-xl font-bold">
                    {booking.distance} km
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Duration
                  </p>

                  <h3 className="text-xl font-bold">
                    {booking.duration} mins
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Wheels
                  </p>

                  <h3 className="text-xl font-bold">
                    {booking.wheels}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Capacity
                  </p>

                  <h3 className="text-xl font-bold">
                    {booking.capacity} kg
                  </h3>
                </div>

              </div>

              <hr className="border-gray-700"/>

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-400">
                    Total Price
                  </p>

                  <h2 className="text-4xl font-black text-black">
                    ₹{booking.price}
                  </h2>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    booking.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : booking.status === "Accepted"
                      ? "bg-blue-600"
                      : booking.status === "In Transit"
                      ? "bg-purple-600"
                      : booking.status === "Delivered"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {booking.status}
                </span>

              </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">

                <button
                  onClick={() => handlePayment(booking)}
                  className="bg-white text-black hover:bg-gray-300 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all"
                >
                  <CreditCard size={20} />
                  Pay Now
                </button>

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all"
                >
                  <Trash2 size={20} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
    <Footer />
    </>
  );
};

export default Orders;