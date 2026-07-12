import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser , googleLogin} from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

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

      console.log("Login Response:", data);
      console.log("User ID:", data.user?._id);
      console.log("ID:", data.user?._id);

      // Token save
      if (data.user?._id) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);

        console.log("Saved UserId:", localStorage.getItem("userId"));
      } else {
        console.log("❌ user._id nahi mila");
      }
      // Home page par redirect
      navigate("/");

    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
  try {
    const data = await googleLogin(credentialResponse.credential);

    console.log("Google Login Response:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);

    navigate("/");
  } catch (error) {
    console.log(error?.response?.data || error);
    alert("Google Login Failed");
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

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition"
          >
            Login
          </button>

        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
      </div>

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