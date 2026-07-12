import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    truck:String,
    wheels:Number,
    capacity:Number,

    pickup:String,
    drop:String,

    pickupCoords:[Number],
    dropCoords:[Number],

    distance:Number,
    duration:Number,

    price:Number,

    customerName:String,

    phone:String,

    date:String,

    status: {
    type: String,
    enum: ["Pending", "Accepted", "In Transit", "Delivered", "Cancelled"],
    default: "Pending"
}

},{
    timestamps:true
});

export default mongoose.model("Booking",bookingSchema);