const express = require("express");
const location = express.Router();
const asyncWrapper = require('../utilities/middleware/asyncWrapper')

const {
  getAllLocations,
  getLocationByZipCode,
  getLocationByCoordinates,
  getStoresWithinDistance,
  getStoresWithinDistanceByCoordinates,
} = require("../queries/locationQuery.js");


// Local error handler for the location controller. Since we used this in both the product controller and this controller, we can extract this out
// to a utilities/middleware directory in a errorhandler.js file.
const locationErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: errorMessage });
};

// INDEX - show all locations
location.get("/", asyncWrapper(async (req, res) => {
  const allLocations = await getAllLocations();
  if (allLocations[0]) {
    res.status(200).json(allLocations);
  } else {
    throw new Error("Server Error");
  }
}));

// Show one location by id

location.get("/:zipCode", asyncWrapper(async (req, res) => {
  const { zipCode } = req.params;
  const { error, result } = await getLocationByZipCode(zipCode);
  if (error?.code === 0) {
    throw new Error("Location Not Found");
  } else if (error) {
    throw new Error("Server Error");
  } else {
    res.status(200).json(result);
  }
}));

// show name, zipcode by latitude and longitude

location.get("/:latitude/:longitude", asyncWrapper(async (req, res) => {
  const { latitude, longitude } = req.params;
  const { error, result } = await getLocationByCoordinates(latitude, longitude);

  if (error?.code === 0) {
    throw new Error("Location Not Found");
  } else if (error) {
    throw new Error("Server Error");
  } else {
    res.status(200).json(result[0]);
  }
}));

// get stores within user distance and zipcode

location.get("/:zipCode/:distance", async (request, response) => {
  const { zipCode, distance } = request.params;
  try {
    const stores = await getStoresWithinDistance(zipCode, distance);
    response.json(stores);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// get stores within user distance based on latitude, longitude, and distance
location.get(
  "/stores/:latitude/:longitude/:distance",
  async (request, response) => {
    const { latitude, longitude, distance } = request.params;
    try {
      const stores = await getStoresWithinDistanceByCoordinates(
        latitude,
        longitude,
        distance
      );
      response.json(stores);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
);

module.exports = location;
