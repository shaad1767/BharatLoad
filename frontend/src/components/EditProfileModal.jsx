import { useState, useEffect } from "react";

const EditProfileModal = ({
  show,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    
    username: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: null,
  });

    // ✅ Add these two states
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (user) {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dob: user.dob ? user.dob.substring(0, 10) : "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
      profileImage: null,
    });

    setPreview(
      user.profileImage
        ? `http://localhost:5000/uploads/${user.profileImage}`
        : ""
    );
  }
}, [user]);

  if (!show) return null;

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "profileImage") {
    setFormData({
      ...formData,
      profileImage: files[0],
    });

    setPreview(URL.createObjectURL(files[0]));
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

 const handleSubmit = async () => {
  if (!formData.username.trim()) {
    alert("Username is required");
    return;
  }

  if (!formData.phone.trim()) {
    alert("Phone Number is required");
    return;
  }

  setLoading(true);

  const data = new FormData();

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null) {
      data.append(key, formData[key]);
    }
  });

  await onSave(data);

  setLoading(false);
};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <div className="flex justify-center mb-6">

          <img
            src={
              preview
                ? preview
                : "https://placehold.co/150x150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border rounded-lg p-3"
          />

          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfileModal;