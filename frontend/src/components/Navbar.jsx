import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Borcelle from "../assets/Borcelle.png";

export default function Navbar() {
  const navigate = useNavigate();

  // Token check
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-22 flex items-center justify-between">

          {/* LEFT */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
                src={Borcelle}
                alt="Packers & Movers"
                className="h-60 w-auto"
              />
          </div>

          {/* CENTER */}
          <div className="hidden lg:flex items-center gap-16">
            <button
              onClick={() => navigate("/")}
              className="relative font-semibold text-black"
            >
              Home
              <span className="absolute left-0 -bottom-7 h-[3px] w-full bg-black rounded-full"></span>
            </button>

         
          
            <button
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/orders");
                  } else {
                    alert("Please login first.");
                    navigate("/login");
                  }
                }}
              className="font-medium text-gray-700 hover:text-black"
            >
              Orders
            </button>

            <button
                onClick={() => {
                    if (isLoggedIn) {
                      navigate("/support");
                    } else {
                      alert("Please login first.");
                      navigate("/login");
                    }
                  }}             
             className="font-medium text-gray-700 hover:text-black"
            >
              Support
            </button>
          </div>




          {/* RIGHT */}
          <div className="flex items-center gap-4">

            
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => navigate("/DriverPartner")}
                        className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-gray-50"
                      >
                        <User size={20} />
                        <span className="font-medium">Driver Partner</span>
                      </button>

                      <button
                        onClick={() => navigate("/login")}
                        className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-gray-50"
                      >
                        <User size={20} />
                        <span className="font-medium">Login</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-gray-50"
                      >
                        <User size={22} />
                      </button>
                    </>
                  )}

          </div>

        </div>
      </div>
    </nav>
  );
}