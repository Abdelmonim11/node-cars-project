const express = require("express");
const validationMW = require("../middleware/cars.validationMiddleware");
const verifyToken = require('../middleware/verifyToken')
const allowedTo = require('../middleware/allowedTo');
const router = express.Router();

const controller = require("../controllers/cars.controller");
const usersRoles = require("../utilites/usersRoles");

router.route("/")
  .get(controller.getAllCars)
  .post(validationMW, controller.insertCar);

router.route("/:carID")
  .get(controller.getSingleCar)
  .patch(controller.editCar)
  .delete(verifyToken, allowedTo(usersRoles.ADMIN, usersRoles.MANAGER), controller.deleteCar);

module.exports = router;
