export const getSupportDetails = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      contact: {
        phone: "+919876543210",
        email: "support@indianload.com",
      },

      faqs: [
        {
          question: "How do I track my shipment?",
          answer:
            "You can track your shipment using tracking ID on our tracking page.",
        },
        {
          question: "How long does delivery take?",
          answer:
            "Delivery depends on distance, usually 2-5 business days.",
        },
        {
          question: "Can I cancel my booking?",
          answer:
            "Yes, cancellation is allowed before pickup time.",
        },
      ],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};