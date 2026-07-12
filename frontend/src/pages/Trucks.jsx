import React from "react";
import { useNavigate } from "react-router-dom";
import truck from "../assets/truck.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ================= CARD ================= */
const TruckCard = ({ truckData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/address", { state: truckData });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-3xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 w-full"
    >
      <img
        src={truck}
        alt="truck"
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold">{truckData.name}</h3>

        <p className="text-gray-600 mt-3">
          🚛 Wheels: {truckData.wheels}
        </p>

        <p className="text-gray-600">
          ⚖️ Capacity: {truckData.capacityKg} kg
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Click to book this truck
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
export default function Truck() {
  const trucks = [
    { id: 1, name: "Mini Pickup", wheels: 4, capacityKg: 1000, type: "small" },
    { id: 2, name: "Small Carrier", wheels: 6, capacityKg: 2500, type: "small" },
    { id: 3, name: "Light Goods Vehicle", wheels: 6, capacityKg: 3000, type: "small" },

    { id: 4, name: "Medium Cargo", wheels: 6, capacityKg: 5000, type: "medium" },
    { id: 5, name: "Container Truck", wheels: 8, capacityKg: 8000, type: "medium" },
    { id: 6, name: "Delivery Truck", wheels: 10, capacityKg: 10000, type: "medium" },

    { id: 7, name: "Heavy Trailer", wheels: 12, capacityKg: 20000, type: "large" },
    { id: 8, name: "Multi Axle Truck", wheels: 16, capacityKg: 30000, type: "large" },
    { id: 9, name: "Long Container Trailer", wheels: 18, capacityKg: 40000, type: "large" },
  ];

  const small = trucks.filter(t => t.type === "small");
  const medium = trucks.filter(t => t.type === "medium");
  const large = trucks.filter(t => t.type === "large");

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 space-y-16">

        <h2 className="text-4xl lg:text-5xl font-black mb-12">
          Trucks We Provide
        </h2>

        {/* SMALL */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Small Trucks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {small.map(truckData => (
              <TruckCard key={truckData.id} truckData={truckData} />
            ))}
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        {/* MEDIUM */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Medium Trucks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {medium.map(truckData => (
              <TruckCard key={truckData.id} truckData={truckData} />
            ))}
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        {/* LARGE */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Large Trucks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {large.map(truckData => (
              <TruckCard key={truckData.id} truckData={truckData} />
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </>
  );
}