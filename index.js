require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const cors = require("cors");

const httpStatusText = require("./utilites/httpStatusText");

const url = process.env.url;
const port = process.env.port;

mongoose.connect(url).then(() => {
  console.log("MongoBD connection done!");
});

// enable all CORS requests
app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const carsRouter = require("./routes/cars.route");
const usersRouter = require("./routes/users.route");


app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);

// global middleware handler for other wrong routes
app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} route on this server!`);
  error.statusCode = 404;
  error.statusText = 'fail';
  next(error); // This forces Express to skip to the 4-argument handler below
});

// global error handler
app.use((error, req, res, next) => {
   res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null
  });
});

app.listen(port || 3000, () => {
  console.log("listening on port 3000");
});
