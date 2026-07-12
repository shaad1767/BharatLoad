import DriverPartner from "../models/DriverPartner.js";
import Truck from "../models/Truck.js";

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

// =========================================
// Update Truck
// =========================================

export const updateTruck = async (req, res) => {

  try {

    const { id } = req.params; // Driver ID

    const driver = await DriverPartner
      .findById(id)
      .populate("truck");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    const truck = driver.truck;

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: "Truck not found",
      });
    }

    const {
      truckType,
      vehicleNumber,
      brand,
      model,
      capacity,
    } = req.body;

    truck.truckType = truckType || truck.truckType;
    truck.vehicleNumber = vehicleNumber || truck.vehicleNumber;
    truck.brand = brand || truck.brand;
    truck.model = model || truck.model;
    truck.capacity = capacity || truck.capacity;

   
    await truck.save();

    return res.status(200).json({
      success: true,
      message: "Truck Updated Successfully",
      truck,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};