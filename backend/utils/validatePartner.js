export const validatePartner = (body) => {
  const requiredFields = [
    "fullName",
    "phone",
    "city",
    "state",
    "address",

    "licenseNumber",
    "aadhaar",
    "pan",

    "truckType",
    "vehicleNumber",
    "brand",
    "model",
    "capacity",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }

  return null;
};