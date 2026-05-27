import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);

    console.log(data);

  } catch (error) {
    console.log(error.response.data);
  }
};






  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="bg-white p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-lg">

        <h1 className="text-3xl font-bold text-black text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="text-black text-sm mb-2 block">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-black text-sm mb-2 block">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <span className="text-gray-500 text-sm">OR</span>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

        </div>

        {/* Google Login */}
        <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 text-black py-3 rounded-xl font-medium hover:bg-gray-100 transition">

          <FcGoogle size={22} />
          Continue with Google

        </button>

        {/* Register Link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-black font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;