import { useEffect, useState } from "react";
import {
  FaTruckMoving,
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";
import { getDriverDashboard } from "../../services/driverService";

const DashboardHome = () => {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const driverId = localStorage.getItem("driverId");

        const response = await getDriverDashboard(driverId);

        setDashboard(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome Driver 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">

          <FaTruckMoving className="text-4xl text-blue-600 mb-4" />

          <p className="text-gray-500 font-medium">
            Active Trips
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {dashboard?.activeTrips ?? 0}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">

          <FaCheckCircle className="text-4xl text-green-600 mb-4" />

          <p className="text-gray-500 font-medium">
            Completed Trips
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {dashboard?.completedTrips ?? 0}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

          <FaRupeeSign className="text-4xl text-yellow-500 mb-4" />

          <p className="text-gray-500 font-medium">
            Total Earnings
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{dashboard?.totalEarnings ?? 0}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">

          <FaStar className="text-4xl text-orange-500 mb-4" />

          <p className="text-gray-500 font-medium">
            Rating
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ⭐ {dashboard?.rating ?? 5}
          </h2>

        </div>

      </div>

      {/* Quick Info */}

      <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Driver Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-blue-700">
              Driver Name
            </h3>

            <p className="text-2xl font-bold mt-2">
              {dashboard?.driver?.fullName}
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-semibold text-green-700">
              Truck
            </h3>

            <p className="text-2xl font-bold mt-2">
              {dashboard?.driver?.truck?.truckType}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-700">
              Vehicle Number
            </h3>

            <p className="text-2xl font-bold mt-2">
              {dashboard?.driver?.truck?.vehicleNumber}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-semibold text-purple-700">
              City
            </h3>

            <p className="text-2xl font-bold mt-2">
              {dashboard?.driver?.city}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;