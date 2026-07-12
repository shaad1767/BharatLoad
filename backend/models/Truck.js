import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    truckType: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    brand: String,

    model: String,

    capacity: String,

    rcFile: String,

    insuranceFile: String,

    fitnessFile: String,

    truckPhotos: [
      {
        type: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverPartner",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Truck",
  truckSchema
);