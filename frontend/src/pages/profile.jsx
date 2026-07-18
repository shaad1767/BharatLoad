import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
} from "react-icons/fa";

import { getProfile, updateProfile } from "../services/profileService";
import EditProfileModal from "../components/EditProfileModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("userId");

        if (!id) {
          console.log("No userId found");
          return;
        }

        const response = await getProfile(id);
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading...
      </div>
    );
  }

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleProfileUpdate = async (formData) => {
    try {
      const id = localStorage.getItem("userId");

      const response = await updateProfile(id, formData);

      alert(response.message);

      setUser(response.user);
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("driverId");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="relative h-64 bg-gradient-to-r from-black via-gray-900 to-black">

           

          </div>

          {/* PROFILE */}
          <div className="relative px-8 pb-10">

            <div className="flex flex-col items-center -mt-24">

              {user.profileImage ? (
                <img
                src={`${(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api", "")}/uploads/${user.profileImage}`}
                alt=""
                className="w-44 h-44 rounded-full border-8 border-white shadow-2xl object-cover"
              />
              ) : (
                <FaUserCircle className="text-[180px] text-gray-300 bg-white rounded-full border-8 border-white shadow-2xl" />
              )}

              <h1 className="text-4xl font-bold mt-5">
                {user.username}
              </h1>

              <p className="text-gray-500 text-lg">
                {user.email}
              </p>

              <div className="flex gap-3 mt-4">

                <span className="bg-black text-white px-5 py-2 rounded-full">
                  Customer
                </span>

                <span className="bg-green-500 text-white px-5 py-2 rounded-full">
                  ✔ Verified
                </span>

              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">📞 Phone</p>
                <p className="font-semibold">{user.phone || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">👤 Gender</p>
                <p className="font-semibold">{user.gender || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">🎂 DOB</p>
                <p className="font-semibold">
                  {user.dob
                    ? new Date(user.dob).toLocaleDateString()
                    : "Not Added"}
                </p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">📍 Address</p>
                <p className="font-semibold">{user.address || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">🏙 City</p>
                <p className="font-semibold">{user.city || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">🗺 State</p>
                <p className="font-semibold">{user.state || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">📮 Pincode</p>
                <p className="font-semibold">{user.pincode || "Not Added"}</p>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-gray-500">📅 Joined</p>
                <p className="font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-center gap-6 mt-10">

              <button
                onClick={() => setShowEditModal(true)}
                className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                <FaEdit className="inline mr-2" />
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      <EditProfileModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;