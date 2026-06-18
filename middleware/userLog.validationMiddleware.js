const { body } = require("express-validator");

const validationMW = [
  body("email").notEmpty().withMessage("fill email field pls"),
  body("password").notEmpty().withMessage("password is required!"),
];

module.exports = validationMW;
