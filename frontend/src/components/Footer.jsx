import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black mt-20 border-t border-gray-300">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              PACKERS & MOVERS
            </h2>

            <p className="text-gray-500 leading-relaxed">
              Reliable logistics and transportation solutions
              across India. We provide safe, affordable and
              timely delivery services for businesses and
              individuals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-500">
              <li className="hover:text-black cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-black cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Services
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-gray-500">
              <li>House Shifting</li>
              <li>Office Relocation</li>
              <li>Vehicle Transport</li>
              <li>Warehouse Services</li>
              <li>Industrial Logistics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-500">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Patna, Bihar, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@packersmovers.com</span>
              </div>

            </div>

            <div className="mt-6">
              <p className="text-gray-500 text-sm">
                Available 24/7 for customer support and logistics assistance.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Packers & Movers. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">

            <span className="hover:text-black cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-black cursor-pointer transition">
              Terms & Conditions
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}