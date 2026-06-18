const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carsSchema = new Schema({
    name: String,
    model: Number
})


module.exports = mongoose.model('car', carsSchema)