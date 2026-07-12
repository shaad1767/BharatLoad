import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaTruck,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import DashboardHome from "../components/driver/DashboardHome";
import MyTruck from "../components/driver/MyTruck";
import Profile from "../components/driver/Profile";
import { getDriverDashboard } from "../services/driverService";
import { useNavigate } from "react-router-dom";


const DriverDashboard = () => {

  const navigate = useNavigate();


  const [dashboard, setDashboard] = useState(null);

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const driverId =
          localStorage.getItem("driverId");

        const response =
          await getDriverDashboard(driverId);

        setDashboard(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;

     
      case "truck":
        return <MyTruck />;

      case "profile":
        return <Profile />;

      default:
        return <DashboardHome />;
    }
  };

  const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-64 bg-blue-700 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          BharatLoad
        </h1>

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg mb-3 ${
            activeTab === "dashboard"
              ? "bg-white text-blue-700"
              : "hover:bg-blue-600"
          }`}
        >
          <FaTachometerAlt />
          Dashboard
        </button>

       

        <button
          onClick={() => setActiveTab("truck")}
          className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg mb-3 ${
            activeTab === "truck"
              ? "bg-white text-blue-700"
              : "hover:bg-blue-600"
          }`}
        >
          <FaTruck />
          My Truck
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg mb-3 ${
            activeTab === "profile"
              ? "bg-white text-blue-700"
              : "hover:bg-blue-600"
          }`}
        >
          <FaUser />
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1">

        {/* Topbar */}

        <div className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Driver Dashboard
          </h2>

          <div className="font-semibold">
            Welcome 👋 Driver
          </div>

        </div>

        {/* Dynamic Content */}

        <div className="p-8">
          {renderContent()}
        </div>

      </div>

    </div>
  );
};

export default DriverDashboard;