import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import truck from "../assets/truck.png";
import agriculture from "../assets/agriculture.jpeg";
import pharmaceutical from "../assets/pharma1.jpeg";
import steel from "../assets/steel.png";
import electronics from "../assets/electronics.jpeg";
import TruckSections from "./Trucks";

const industries = [
  {
    title: "Agriculture",
    image: agriculture,
    desc: "Transportation for crops, grains and agricultural products.",
  },
  {
    title: "Pharmaceutical",
    image: pharmaceutical,
    desc: "Safe medicine and healthcare logistics solutions.",
  },
  {
    title: "Steel & Cement",
    image: steel,
    desc: "Heavy construction material transportation.",
  },
  {
    title: "Electronics",
    image: electronics,
    desc: "Secure transportation of electronic goods.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
     
    <div className="bg-white min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ========== LEFT ========== */}
          <div>

            <div className="flex flex-col">

              {/* Top Line */}
              <div className="flex items-center gap-3">
                <span className="text-2xl lg:text-3xl font-semibold leading-tight">
                  India's Most Trusted
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mt-2">
                Logistics Partner
              </h1>

              {/* Description */}
              <p className="mt-6 text-gray-600 text-lg max-w-md leading-relaxed">
                Reliable transport solutions for businesses across every industry
              </p>

            </div>

           

          </div>

          {/* ========== RIGHT ========== */}
          <div>
            <img
              src={truck}
              alt="IndianLoad Truck"
              className="
                w-full
                rounded-3xl
                object-cover
              "
            />
          </div>

        </div>
      </section>

      {/* ================= LOCATION BAR ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-4">

        <div className="
          bg-white
          border
          rounded-3xl
          shadow-lg
          p-6
          flex
          items-center
          justify-between
        ">

          <div className="flex items-center gap-4">

            <div className="
              bg-black
              text-white
              h-12
              w-12
              rounded-full
              flex
              items-center
              justify-center
            ">
              <MapPin size={22} />
            </div>

            <div>
              <h3 className="font-bold">
                Pickup Location
              </h3>

              <p className="text-gray-500">
                New Delhi, India
              </p>
            </div>

          </div>

          <ArrowRight />

        </div>
      </div>

      {/* ================= INDUSTRIES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="mb-12">

          <h2 className="text-4xl lg:text-5xl font-black mt-2">
            Industries We Serve
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">


          {industries.map((item, index) => (
            <Link to="/Trucksections"
            className="text-black font-semibold hover:underline"
          >
            <div
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
              "
             
            >

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    h-45
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-110
                  "
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-6 flex justify-end">

                  <div className="
                    h-10
                    w-10
                    rounded-full
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                  ">
                    <ArrowRight size={18} />
                  </div>

                </div>

              </div>

            </div>
              </Link>
          ))}

        </div>

      </section>

       <Footer />

    </div>
    </>
  );
 
}