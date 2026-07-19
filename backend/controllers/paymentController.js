import razorpay from "../config/razorpay.js";
import crypto from "crypto";


// paymentController.js

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Validation check: Dekho frontend se price aa bhi raha hai ya nahi
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ success: false, message: "Valid Amount is required" });
        }

        const options = {
            amount: Math.round(Number(amount) * 100), // Ensure decimal numbers round off ho jayein aur absolute integer banein
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        // Razorpay order create call
        const order = await razorpay.orders.create(options);
        
        // Agar success hua toh frontend ko order details bhej do
        return res.json(order);

    } catch (error) {
        // 🔎 YEH LINE TERMINAL MEIN EXACT ERROR DIKHAYEGI (Bina [object Object] ke)
        console.error("🔴 RAZORPAY API CRASH ERROR:", JSON.stringify(error, null, 2));
        
        // Frontend ko response bhejo taaki loader na atka rahe
        return res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.description || "Razorpay Order Creation Failed",
            error: error
        });
    }
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