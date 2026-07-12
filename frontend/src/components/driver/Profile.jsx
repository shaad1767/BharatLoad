import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaTruck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { getDriverProfile } from "../../services/driverService";

const Profile = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("driverId");
        const response = await getDriverProfile(id);
        setDriver(response.driver);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        Driver Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Profile Image */}
        <div className="flex flex-col items-center">

          <img
            src={
              driver?.driverPhoto
                ? `http://localhost:5000/uploads/${driver.driverPhoto}`
                : "https://via.placeholder.com/150"
            }
            alt="Driver"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-lg"
          />

          <h3 className="mt-4 text-2xl font-bold text-gray-800">
            {driver?.fullName}
          </h3>

          <span className="mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            Verified Driver
          </span>

        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-blue-600" />
              <span>{driver?.phone}</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-red-500" />
              <span>{driver?.email}</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <FaTruck className="text-orange-500" />
              <span>{driver?.licenseNumber}</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-green-600" />
              <span>
                {driver?.city}, {driver?.state}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm md:col-span-2">
            <p className="flex items-center gap-3 text-gray-700">
              <FaUser className="text-purple-600" />
              <span>{driver?.address}</span>
            </p>
          </div>

        </div>

      </div>

      <div className="mt-10 flex justify-end">

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
          Edit Profile
        </button>

      </div>

    </div>
  );
};

export default Profile;