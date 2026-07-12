import { useState } from "react";
import { registerPartner } from "../services/PartnerService";
import { useNavigate } from "react-router-dom";



const DrivingPartner = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    address: "",

    // Driver Details
    licenseNumber: "",
    licenseExpiry: "",
    aadhaar: "",
    pan: "",
    experience: "",
    dob: "",          // State mein missing tha, add kar diya
    bankAccount: "",  // State mein missing tha, add kar diya
    ifsc: "",         // State mein missing tha, add kar diya

    // Truck Details
    truckType: "",
    vehicleNumber: "",
    brand: "",
    model: "",
    capacity: "",

    // Documents
    driverPhoto: null,
    licenseFile: null,
    aadhaarFile: null,
    panFile: null,
    rcFile: null,
    insuranceFile: null,
    fitnessFile: null,
    truckPhotos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleMultipleFiles = (e) => {
    setFormData((prev) => ({
      ...prev,
      truckPhotos: [...e.target.files],
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      // ==========================
      // Personal Details
      // ==========================

      data.append("fullName", formData.fullName);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("address", formData.address);

      // ==========================
      // Driver Details
      // ==========================

      data.append("licenseNumber", formData.licenseNumber);
      data.append("licenseExpiry", formData.licenseExpiry);
      data.append("aadhaar", formData.aadhaar);
      data.append("pan", formData.pan);
      data.append("experience", formData.experience);
      data.append("dob", formData.dob);
      data.append("bankAccount", formData.bankAccount);
      data.append("ifsc", formData.ifsc);

      // ==========================
      // Truck Details
      // ==========================

      data.append("truckType", formData.truckType);
      data.append("vehicleNumber", formData.vehicleNumber);
      data.append("brand", formData.brand);
      data.append("model", formData.model);
      data.append("capacity", formData.capacity);

      // ==========================
      // Documents
      // ==========================

      data.append("driverPhoto", formData.driverPhoto);
      data.append("licenseFile", formData.licenseFile);
      data.append("aadhaarFile", formData.aadhaarFile);
      data.append("panFile", formData.panFile);
      data.append("rcFile", formData.rcFile);
      data.append("insuranceFile", formData.insuranceFile);
      data.append("fitnessFile", formData.fitnessFile);

      formData.truckPhotos.forEach((photo) => {
        data.append("truckPhotos", photo);
      });

      // ==========================
      // API CALL
      // ==========================

      const response = await registerPartner(data);
      console.log("Response:", response);
      console.log("Partner:", response.partner);


      localStorage.setItem("driverId", response.data.driver._id);
      alert(response.message || "Registration Successful");
      navigate("/driver/dashboard"); // Redirect to Driver Dashboard after successful registration

      

    } catch (error) {
      console.error(error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Response:", error.response.data);
    alert(error.response.data.message);
  } else {
    console.log("JS Error:", error.message);
    alert(error.message);
  }
    }
  };

  // SARI DETAIL AB IS RETURN KE ANDAR HAI TAQI SAB KUCH SCREEN PAR SHOW HO
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* Hero Section */}
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-black to-gray-800 rounded-2xl text-white p-10 shadow-lg">        <h1 className="text-4xl font-bold">
          Become a BharatLoad Driving Partner
        </h1>
        <p className="mt-4 text-lg text-gray-100">
          Register yourself and your truck to start receiving delivery
          requests across India.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto bg-white mt-8 rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          Driver Partner Registration
        </h2>

        {/* ==========================
            PERSONAL DETAILS
        ========================== */}
        <h3 className="text-xl font-semibold mb-5 text-blue-700">
          👤 Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Patna"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Bihar"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address</label>
            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Complete Address"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ==========================
            DRIVER DETAILS
        ========================== */}
        <div className="border-t mt-10 pt-8">
          <h3 className="text-xl font-semibold mb-5 text-blue-700">
            🚛 Driver Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Driving Licence Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="DL-XXXXXXXXXXXX"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Licence Expiry Date</label>
              <input
                type="date"
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Aadhaar Number</label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="1234 5678 9012"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">PAN Number</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Driving Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Bank Account Number</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">IFSC Code</label>
              <input
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                placeholder="SBIN0001234"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ==========================
            TRUCK DETAILS
        ========================== */}
        <div className="border-t mt-10 pt-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-6">
            🚚 Truck Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Truck Type</label>
              <select
                name="truckType"
                value={formData.truckType}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Truck</option>
                <option value="Tata Ace">Tata Ace</option>
                <option value="Pickup">Pickup</option>
                <option value="14 Feet">14 Feet</option>
                <option value="17 Feet">17 Feet</option>
                <option value="20 Feet">20 Feet</option>
                <option value="Container">Container</option>
                <option value="Trailer">Trailer</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="BR01AB1234"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Vehicle Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Tata / Ashok Leyland / Eicher"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="2023"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Load Capacity</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="7 Ton"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </div>

        {/* ==========================
            DOCUMENT UPLOAD
        ========================== */}
        <div className="border-t mt-10 pt-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-6">
            📄 Upload Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Driver Photo</label>
              <input
                type="file"
                name="driverPhoto"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Driving Licence</label>
              <input
                type="file"
                name="licenseFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Aadhaar Card</label>
              <input
                type="file"
                name="aadhaarFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">PAN Card</label>
              <input
                type="file"
                name="panFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">RC Book</label>
              <input
                type="file"
                name="rcFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Insurance Certificate</label>
              <input
                type="file"
                name="insuranceFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Fitness Certificate</label>
              <input
                type="file"
                name="fitnessFile"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Truck Photo(s)</label>
              <input
                type="file"
                multiple
                name="truckPhotos"
                onChange={handleMultipleFiles}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>
        </div>

        {/* ==========================
            SUBMIT BUTTON
        ========================== */}
        <div className="border-t mt-10 pt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-zinc-900 hover:bg-black text-white px-10 py-3 rounded-lg font-semibold text-lg transition"          >
            Register as Driving Partner
          </button>
        </div>

      </div>
    </div>
  );
};

export default DrivingPartner;