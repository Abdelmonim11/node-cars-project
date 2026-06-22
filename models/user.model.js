const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./cars.model.schema');
const usersRoles = require('../utilites/usersRoles');
const { defaults, defaultTo } = require('lodash');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "fill first name block"]
    },
    lastName: {
        type: String,
        required: [true, "fill last name block"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'pleade enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [usersRoles.ADMIN, usersRoles.USER, usersRoles.MANAGER],
        default: usersRoles.USER,
    },
    avatar: {
        type: String,
        default: '../uploads/profile.jpg',
    }
})


module.exports = mongoose.model('user', userSchema)
