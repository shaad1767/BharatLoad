import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile";
import Footer from "./components/footer";
import Support from "./pages/Support";
import TruckSections from "./pages/Trucks";
import Address from "./pages/Address";
import Orders from "./pages/Order";
import DriverPartner from "./pages/driverPartner";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  return (
    <BrowserRouter>

      {/* <Navbar /> */}
      

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/support" element={<Support />} />
        <Route path="/Trucksections" element={<TruckSections />} />
        <Route path="/address" element={<Address />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/DriverPartner" element={<DriverPartner />}  />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
      </Routes>


        

    </BrowserRouter>
    
  );
}

export default App;