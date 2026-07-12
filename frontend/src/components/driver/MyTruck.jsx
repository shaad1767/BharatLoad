import { useEffect, useState } from "react";
import {
  FaTruck,
  FaHashtag,
  FaIndustry,
  FaWeightHanging,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { getDriverProfile } from "../../services/driverService";

const MyTruck = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchTruck = async () => {
      try {
        const driverId = localStorage.getItem("driverId");

        const response = await getDriverProfile(driverId);
        console.log(response);

        setDriver(response.driver);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTruck();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-8">
        🚛 My Truck
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaTruck className="text-blue-600 text-xl" />
            <span className="font-semibold">Truck Type</span>
          </p>

          <p className="mt-3 text-lg font-bold text-gray-700">
            {driver?.truck?.truckType}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaHashtag className="text-green-600 text-xl" />
            <span className="font-semibold">Vehicle Number</span>
          </p>

          <p className="mt-3 text-lg font-bold text-gray-700">
            {driver?.truck?.vehicleNumber}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaIndustry className="text-orange-500 text-xl" />
            <span className="font-semibold">Brand</span>
          </p>

          <p className="mt-3 text-lg font-bold text-gray-700">
            {driver?.truck?.brand}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaWeightHanging className="text-purple-600 text-xl" />
            <span className="font-semibold">Capacity</span>
          </p>

          <p className="mt-3 text-lg font-bold text-gray-700">
            {driver?.truck?.capacity}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
  <p className="flex items-center gap-3">
    <FaIndustry className="text-indigo-600 text-xl" />
    <span className="font-semibold">Model</span>
  </p>

  <p className="mt-3 text-lg font-bold text-gray-700">
    {driver?.truck?.model || "N/A"}
  </p>
</div>

<div className="bg-gray-50 rounded-xl p-5 shadow-sm">
  <p className="flex items-center gap-3">
    <FaTruck className="text-red-500 text-xl" />
    <span className="font-semibold">Owner</span>
  </p>

  <p className="mt-3 text-lg font-bold text-gray-700">
    {driver?.fullName}
  </p>
</div>

<div className="bg-gray-50 rounded-xl p-5 shadow-sm">
  <p className="flex items-center gap-3">
    <FaHashtag className="text-pink-600 text-xl" />
    <span className="font-semibold">Registration Status</span>
  </p>

  <p className="mt-3 font-bold text-green-600">
    Registered
  </p>
</div>

<div className="bg-gray-50 rounded-xl p-5 shadow-sm">
  <p className="flex items-center gap-3">
    <FaTruck className="text-cyan-600 text-xl" />
    <span className="font-semibold">Fitness Certificate</span>
  </p>

  <p
    className={`mt-3 font-bold ${
      driver?.truck?.fitnessFile
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {driver?.truck?.fitnessFile
      ? "Uploaded"
      : "Not Uploaded"}
  </p>
</div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaShieldAlt className="text-green-600 text-xl" />
            <span className="font-semibold">Insurance</span>
          </p>

          <p
            className={`mt-3 font-bold ${
              driver?.truck?.insuranceFile
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {driver?.truck?.insuranceFile
              ? "Uploaded"
              : "Not Uploaded"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <p className="flex items-center gap-3">
            <FaFileAlt className="text-blue-600 text-xl" />
            <span className="font-semibold">RC Book</span>
          </p>

          <p
            className={`mt-3 font-bold ${
              driver?.truck?.rcFile
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {driver?.truck?.rcFile
              ? "Uploaded"
              : "Not Uploaded"}
          </p>
        </div>

      </div>

      <div className="mt-10 flex justify-end">

        <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
          Edit Truck
        </button>

      </div>

    </div>
  );
};

export default MyTruck;