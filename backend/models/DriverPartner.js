import mongoose from "mongoose";

const driverPartnerSchema = new mongoose.Schema(
  {
    // Personal Details
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: "",
    },

    city: String,
    state: String,
    address: String,

    // Driver Details
    licenseNumber: {
      type: String,
      required: true,
    },

    licenseExpiry: Date,

    aadhaar: {
      type: String,
      required: true,
    },

    pan: {
      type: String,
      required: true,
    },

    experience: Number,

    dob: Date,

    bankAccount: String,

    ifsc: String,

    // Documents
    driverPhoto: String,
    licenseFile: String,
    aadhaarFile: String,
    panFile: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DriverPartner",
  driverPartnerSchema
);