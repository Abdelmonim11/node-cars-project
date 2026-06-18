const { body } = require("express-validator");

const validationMW = [
  body("name").notEmpty().withMessage("must fill name block"),
  body("model")
    .isLength({
      min: 3,
      max: 4,
    })
    .withMessage("please provide a valid model date"),
];

module.exports = validationMW;
