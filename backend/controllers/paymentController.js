import razorpay from "../config/razorpay.js";
import crypto from "crypto";


export const createOrder = async (req, res) => {

    const { amount } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
};



export const verifyPayment = async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;


      // 👇 YAHAN lagao (START me)
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing fields" 
        });
    }

    const sign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (sign === razorpay_signature) {

        // ✅ YAHAN SAVE KARO BOOKING
        await Booking.create({
            ...req.body.booking,   // booking data frontend se aayega
            paymentStatus: "Paid",
            paymentId: razorpay_payment_id,
        });

        return res.json({ success: true });
    }

    return res.status(400).json({ success: false });
};