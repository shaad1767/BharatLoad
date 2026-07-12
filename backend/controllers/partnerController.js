import DriverPartner from "../models/DriverPartner.js";
import Truck from "../models/Truck.js";
import { validatePartner } from "../utils/validatePartner.js";

export const registerPartner = async (req, res) => {
  try {
    // =============================
    // Get Data
    // =============================

    const {
      // Personal Details
      fullName,
      phone,
      email,
      city,
      state,
      address,

      // Driver Details
      licenseNumber,
      licenseExpiry,
      aadhaar,
      pan,
      experience,
      dob,
      bankAccount,
      ifsc,

      // Truck Details
      truckType,
      vehicleNumber,
      brand,
      model,
      capacity,
    } = req.body;

    // =============================
    // Basic Validation
    // =============================

    const validationError = validatePartner(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // =============================
    // Phone Validation
    // =============================

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Phone Number",
      });
    }

    // =============================
    // Aadhaar Validation
    // =============================

    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Aadhaar Number",
      });
    }

    // =============================
    // PAN Validation
    // =============================

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PAN Number",
      });
    }

    // =============================
    // Vehicle Number Validation
    // =============================

    const vehicleRegex =
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i;

    if (!vehicleRegex.test(vehicleNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Vehicle Number",
      });
    }

    // =============================
    // Required Files
    // =============================

    if (!req.files?.licenseFile) {
      return res.status(400).json({
        success: false,
        message: "Driving Licence is required",
      });
    }

    if (!req.files?.rcFile) {
      return res.status(400).json({
        success: false,
        message: "RC Book is required",
      });
    }

    // =============================
    // Duplicate Driver Check
    // =============================

    const existingDriver = await DriverPartner.findOne({
      $or: [
        { phone },
        { licenseNumber },
        { aadhaar },
      ],
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "Driver already registered",
      });
    }

    // =============================
    // Duplicate Truck Check
    // =============================

    const existingTruck = await Truck.findOne({
      vehicleNumber,
    });

    if (existingTruck) {
      return res.status(400).json({
        success: false,
        message: "Truck already registered",
      });
    }

    // =============================
    // Uploaded Files
    // =============================

    const driverPhoto =
      req.files?.driverPhoto?.[0]?.filename || "";

    const licenseFile =
      req.files?.licenseFile?.[0]?.filename || "";

    const aadhaarFile =
      req.files?.aadhaarFile?.[0]?.filename || "";

    const panFile =
      req.files?.panFile?.[0]?.filename || "";

    const rcFile =
      req.files?.rcFile?.[0]?.filename || "";

    const insuranceFile =
      req.files?.insuranceFile?.[0]?.filename || "";

    const fitnessFile =
      req.files?.fitnessFile?.[0]?.filename || "";

    const truckPhotos =
      req.files?.truckPhotos?.map(
        (file) => file.filename
      ) || [];

    // =============================
    // Save Driver
    // =============================

    const driver = await DriverPartner.create({
      fullName,
      phone,
      email,
      city,
      state,
      address,

      licenseNumber,
      licenseExpiry,
      aadhaar,
      pan,
      experience,
      dob,
      bankAccount,
      ifsc,

      driverPhoto,
      licenseFile,
      aadhaarFile,
      panFile,
    });

    // =============================
    // Save Truck
    // =============================

    const truck = await Truck.create({
      truckType,
      vehicleNumber,
      brand,
      model,
      capacity,

      rcFile,
      insuranceFile,
      fitnessFile,
      truckPhotos,

      owner: driver._id,
    });

    // =============================
    // Link Driver & Truck
    // =============================

    driver.truck = truck._id;

    await driver.save();

    // =============================
    // Success Response
    // =============================

    return res.status(201).json({
      success: true,
      message: "Driver Partner Registered Successfully",
      data: {
        driver,
        truck,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });

  }
};



// =========================================
// Driver Dashboard
// =========================================

export const getDriverDashboard = async (req, res) => {
  try {

    const { id } = req.params;

    const driver = await DriverPartner
      .findById(id)
      .populate("truck");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,

      data: {
        activeTrips: 0,
        completedTrips: 0,
        totalEarnings: 0,
        rating: 5,

        driver,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Driver Profile
// =========================================

export const getDriverProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const driver = await DriverPartner
      .findById(id)
      .populate("truck");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      driver,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =========================================
// Driver Trips
// =========================================

export const getDriverTrips = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,

      trips: [],

      message:
        "Trips API is ready. Booking integration pending.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// =========================================
// Update Driver Profile
// =========================================

export const updateDriverProfile = async (req, res) => {
  try {

    const { id } = req.params;

    const driver = await DriverPartner.findById(id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    const {
      fullName,
      phone,
      email,
      city,
      state,
      address,
      experience,
      bankAccount,
      ifsc,
    } = req.body;

    driver.fullName = fullName || driver.fullName;
    driver.phone = phone || driver.phone;
    driver.email = email || driver.email;
    driver.city = city || driver.city;
    driver.state = state || driver.state;
    driver.address = address || driver.address;
    driver.experience = experience || driver.experience;
    driver.bankAccount = bankAccount || driver.bankAccount;
    driver.ifsc = ifsc || driver.ifsc;

    // Driver Photo
    if (req.files?.driverPhoto) {
      driver.driverPhoto =
        req.files.driverPhoto[0].filename;
    }

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      driver,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};