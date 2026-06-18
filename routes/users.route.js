const express = require("express");
const regValidationMW = require("../middleware/userReg.validationMiddleware");
const logValidationMW = require("../middleware/userLog.validationMiddleware");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `user-${req.body.firstName}-${Date.now()}.${file.mimetype.split("/")[1]}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType == "image") {
    return cb(null, true);
  } else {
    return cb(
      appError.create(
        "this file type doesn't accepted, pls upload an image",
        400,
      ),
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});

const controller = require("../controllers/users.controller");
const appError = require("../utilites/appError");

const router = express.Router();

router.route("/").get(verifyToken, controller.getAllUsers);

router
  .route("/register")
  .post(regValidationMW, upload.single("avatar"), controller.register);

router.route("/login").post(logValidationMW, controller.login);

module.exports = router;
