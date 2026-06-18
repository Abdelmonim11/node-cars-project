const { body } = require("express-validator");

const validationMW = [
  body("firstName").notEmpty().withMessage("fill this FN field pls"),
  body("lastName").notEmpty().withMessage("fill this FN field pls"),
  body("email").notEmpty().withMessage("fill email field pls"),
  body("password").notEmpty().withMessage("password is required!"),
];

module.exports = validationMW;
