import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSupportDetails } from "../services/supportService";

export default function Support() {
  const navigate = useNavigate();

  const [support, setSupport] = useState({
    contact: {
      phone: "",
      email: "",
    },
    faqs: [],
  });

  useEffect(() => {
    fetchSupport();
  }, []);

  const fetchSupport = async () => {
    try {
      const response = await getSupportDetails();

      if (response.success) {
        setSupport(response);
      }
    } catch (error) {
      console.log("Support API Error:", error);
    }
  };

  const handleCall = () => {
    if (support.contact.phone) {
      window.location.href = `tel:${support.contact.phone}`;
    }
  };

  const handleEmail = () => {
    if (support.contact.email) {
      window.location.href = `mailto:${support.contact.email}`;
    }
  };

  const handleChat = () => {
    navigate("/chat");
  };

  const handleHelp = () => {
    navigate("/help");
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-black">
          Customer Support
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl">
          We are here to help you 24/7. Track shipments, resolve issues,
          or get help with booking your transport service.
        </p>

        {/* Support Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {/* Call */}
          <button
            onClick={handleCall}
            className="border rounded-2xl p-6 hover:shadow-lg transition text-left"
          >
            <Phone className="text-black" size={30} />

            <h2 className="text-xl font-semibold mt-3">
              Call Us
            </h2>

            <p className="text-gray-500 mt-2">
              {support.contact.phone || "Loading..."}
            </p>
          </button>

          {/* Email */}
          <button
            onClick={handleEmail}
            className="border rounded-2xl p-6 hover:shadow-lg transition text-left"
          >
            <Mail className="text-black" size={30} />

            <h2 className="text-xl font-semibold mt-3">
              Email Support
            </h2>

            <p className="text-gray-500 mt-2">
              {support.contact.email || "Loading..."}
            </p>
          </button>

          {/* Chat */}
          <button
            onClick={handleChat}
            className="border rounded-2xl p-6 hover:shadow-lg transition text-left"
          >
            <MessageCircle className="text-black" size={30} />

            <h2 className="text-xl font-semibold mt-3">
              Live Chat
            </h2>

            <p className="text-gray-500 mt-2">
              Chat with agent instantly
            </p>
          </button>

          {/* Help */}
          <button
            onClick={handleHelp}
            className="border rounded-2xl p-6 hover:shadow-lg transition text-left"
          >
            <HelpCircle className="text-black" size={30} />

            <h2 className="text-xl font-semibold mt-3">
              Help Center
            </h2>

            <p className="text-gray-500 mt-2">
              FAQs & Guides
            </p>
          </button>

        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-black">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-6">

            {support.faqs.length > 0 ? (
              support.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border p-5 rounded-xl"
                >
                  <h3 className="font-semibold">
                    {faq.question}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Loading FAQs...
              </p>
            )}

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}