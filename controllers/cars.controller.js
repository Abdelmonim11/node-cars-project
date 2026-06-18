const { validationResult } = require("express-validator");
const Car = require("../models/cars.model.schema");
const httpStatusText = require("../utilites/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utilites/appError");

// // import data
// let { cars } = require("../data/cars");

// get all cars
const getAllCars = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // const cars = new Car({name: "Dodge", model: 2002});
  const cars = await Car.find({}, { __v: 0 }).limit(limit).skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { cars } });
});

// get single car
const getSingleCar = asyncWrapper(async (req, res, next) => {
  const car = await Car.findOne({ _id: req.params.carID });
  if (!car) {
    const error = appError.create("car not found !", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { car } });
});

// insert a car
const insertCar = asyncWrapper(async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const error = appError.create(result.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const car = await new Car(req.body);
  await car.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { car } });
});

//edit a car
const editCar = asyncWrapper(async (req, res) => {
  const carID = req.params.carID;
  let car = await Car.updateOne({ _id: carID }, { $set: { ...req.body } });
  res.status(200).json({ status: "success", data: { car } });
});

//delete a car
const deleteCar = asyncWrapper(async (req, res, next) => {
  const carID = req.params.carID;
  const car = await Car.findById(carID)

  if(!car) {
    const error = appError.create("car is already not exist!", 404, httpStatusText.FAIL);
    return next(error);
  }
  await Car.deleteOne({ _id: carID });
  

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCars,
  getSingleCar,
  insertCar,
  deleteCar,
  editCar,
};
