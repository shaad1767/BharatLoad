


import React, { useEffect, useState  } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { createBooking } from "../services/bookingService";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const API_KEY = import.meta.env.VITE_ORS_API_KEY;

const truckRates = {
  "Mini Pickup": 20,
  "Small Carrier": 25,
  "Light Goods Vehicle": 28,
  "Medium Cargo": 35,
  "Container Truck": 40,
  "Delivery Truck": 38,
  "Heavy Trailer": 55,
  "Multi Axle Truck": 65,
  "Long Container Trailer": 75,
};

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 11);
  }, [center]);

  return null;
}

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
  });

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [routePoints, setRoutePoints] = useState([]);
  const [center, setCenter] = useState([28.6139, 77.2090]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const searchLocation = async (text, type) => {
  if (!text) return;

  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${text}, India`,
          format: "json",
          limit: 1,
        },
      }
    );

    // ✅ SAFETY CHECK (MOST IMPORTANT)
    if (!res.data || res.data.length === 0) {
      console.log("❌ No location found:", text);
      return;
    }

    const item = res.data[0];

    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    if (!lat || !lon) {
      console.log("❌ Invalid coords:", item);
      return;
    }

    const latlng = [lat, lon];

    if (type === "pickup") {
      setPickupCoords(latlng);
      setCenter(latlng);
    } else {
      setDropCoords(latlng);
      setCenter(latlng);
    }

  } catch (err) {
    console.log("Geocode error:", err.message);
  }
};

  useEffect(() => {
    if (form.pickup.length > 5) searchLocation(form.pickup, "pickup");
  }, [form.pickup]);

  useEffect(() => {
    if (form.drop.length > 5) searchLocation(form.drop, "drop");
  }, [form.drop]);

  // =========================
  // GET ROUTE + DISTANCE
  // =========================
  useEffect(() => {
  if (!pickupCoords || !dropCoords) return;

//   console.log("API KEY:", API_KEY);
// console.log("pickupCoords:", pickupCoords);
// console.log("dropCoords:", dropCoords);

 const getRoute = async () => {
  try {
    const apiKey = import.meta.env.VITE_ORS_API_KEY;

    const res = await axios.post(
         "/api/ors/v2/directions/driving-car/geojson", // 👈 ye vercel.json se aa rha h 
         {      
        coordinates: [
          [pickupCoords[1], pickupCoords[0]],
          [dropCoords[1], dropCoords[0]],
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey // 👈 Bearer hata kar direct apiKey bhej rahe hain
        },
      }
    );

    const feature = res.data.features[0];

    if (!feature) return;

    const km = feature.properties.summary.distance / 1000;
    const mins = feature.properties.summary.duration / 60;

    setDistance(km.toFixed(2));
    setDuration(mins.toFixed(0));

    const points = feature.geometry.coordinates.map((c) => [c[1], c[0]]);
    setRoutePoints(points);

    const rate = truckRates[state?.name] || 20;
    setPrice(Math.round(rate * km));

  } catch (err) {
    console.log("Route error:", err.response?.data || err.message);
  }
};

  getRoute();
}, [pickupCoords, dropCoords, state?.name]);



  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async(e) => {
    e.preventDefault();

    const booking = {
      truck: state?.name,
      wheels: state?.wheels,
      capacity: state?.capacityKg,
      pickup: form.pickup,
      drop: form.drop,
      pickupCoords,
      dropCoords,
      distance,
      duration,
      price,
      customerName: form.name,
      phone: form.phone,
      date: form.date,
    };

    try {
    const res = await createBooking(booking);

    console.log(res);
    alert("Booking Successful 🚚");
    navigate("/orders");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Booking Failed");
  }
};
  

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ================= MAP ================= */}
      <div className="h-[450px] rounded-2xl overflow-hidden shadow">
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={center} />
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {pickupCoords && (
            <Marker position={pickupCoords}>
              <Popup>Pickup Location</Popup>
            </Marker>
          )}

          {dropCoords && (
            <Marker position={dropCoords}>
              <Popup>Drop Location</Popup>
            </Marker>
          )}

          {routePoints.length > 0 && <Polyline positions={routePoints} />}
        </MapContainer>
      </div>

      {/* ================= TRUCK INFO ================= */}
      <div className="bg-gray-100 rounded-xl p-6">
        <h2 className="text-3xl font-bold">{state?.name || "No Truck Selected"}</h2>
        <p className="mt-2">Wheels : {state?.wheels || 0}</p>
        <p>Capacity : {state?.capacityKg || 0} kg</p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-bold">Distance</h3>
          <p className="text-2xl mt-2">{distance} km</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-bold">ETA</h3>
          <p className="text-2xl mt-2">{duration} min</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-bold">Estimated Price</h3>
          <p className="text-2xl mt-2 text-green-600">₹ {price}</p>
        </div>
      </div>

      {/* ================= FORM DETAILS ================= */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= ADDRESS DETAILS ================= */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-5">Address Details</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Pickup Address</label>
              <input
                type="text"
                name="pickup"
                placeholder="Enter Pickup Address"
                value={form.pickup}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Drop Address</label>
              <input
                type="text"
                name="drop"
                placeholder="Enter Drop Address"
                value={form.drop}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
                required
              />
            </div>
          </div>
        </div>

        {/* ================= CUSTOMER DETAILS ================= */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-5">Customer Details</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full mt-2 border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className="w-full mt-2 border rounded-lg p-3"
                required
              />
            </div>
          </div>
        </div>

        {/* ================= SCHEDULE ================= */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-5">Schedule Booking</h3>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* ================= BOOKING SUMMARY ================= */}
        <div className="bg-gray-100 rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-5">Booking Summary</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <p>🚚 <strong>Vehicle:</strong> {state?.name || "N/A"}</p>
            <p>⚖️ <strong>Capacity:</strong> {state?.capacityKg || 0} kg</p>
            <p>📏 <strong>Distance:</strong> {distance} km</p>
            <p>⏱️ <strong>ETA:</strong> {duration} min</p>
            <p>💰 <strong>Estimated Price:</strong> ₹ {price}</p>
            <p>📅 <strong>Date:</strong> {form.date || "Not Selected"}</p>
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white text-lg font-semibold py-4 rounded-xl transition"
        >
          Confirm Booking 🚚
        </button>
      </form>
    </div>
  );
}