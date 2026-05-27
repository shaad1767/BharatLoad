import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);
      console.log(data);

      setSuccessMsg("Account Created Successfully 🎉");

      // auto hide popup after 3 sec
      setTimeout(() => {
        navigate("/Home");
      }, 2000);

      // form reset (optional but good UX)
      setFormData({
        username: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      {/* ✅ POPUP */}
      {successMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white-500 text-black py-3 rounded-xl shadow-lg z-50">
          {successMsg}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-lg">

        <h1 className="text-3xl font-bold text-black text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Register to continue
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">

          <div>
            <label className="text-black text-sm mb-2 block">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-black text-sm mb-2 block">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-black text-sm mb-2 block">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-neutral-800"
          >
            Create Account
          </button>

        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-xl">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;