const User = require("../models/user.model");
const httpStatusText = require("../utilites/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const { validationResult } = require("express-validator");
const appError = require("../utilites/appError");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const generateJWT = require('../utilites/generateJWT')

// get all users
const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // const cars = new Car({name: "Dodge", model: 2002});
  const users = await User.find({}, { __v: 0, password: false })
    .limit(limit)
    .skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

// register a new user
const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // const result = validationResult(req);
  // if (!result.isEmpty()) {
  //   const error = appError.create(result.array(), 400, httpStatusText.FAIL);
  //   return next(error);
  // }

  // or

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(
      "this user is already exist!",
      400,
      httpStatusText.FAIL,
    );
    return next(error);
  }

  // password hashing
  const hashedPassword = await bcryptjs.hash(password, 6);

  const user = await new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename
  });

  // generate JWT token
  const token = await generateJWT({email: user.email, id: user._id, role: user.role});
  user.token = token;
     
  
  await user.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { user } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = appError.create(result.array(), 400, httpStatusText.FAIL);
    return next(error);
  };
  
  const user = await User.findOne({email: email});
  if (!user) {
    const error = appError.create("user not found", 400, httpStatusText.FAIL);
    return next(error);
  };
  
  const matchedPassword = await bcryptjs.compare(password, user.password);
  
  if(user && matchedPassword) {
    const token = await generateJWT({email: user.email, id: user._id, role: user.role});
    
    return res.status(201).json({ status: httpStatusText.SUCCESS, data: {token} });
  } else {
    const error = appError.create("email or password is wrong, Try again!", 400, httpStatusText.FAIL);
    return next(error);
  }


});
module.exports = {
  getAllUsers,
  register,
  login
};
