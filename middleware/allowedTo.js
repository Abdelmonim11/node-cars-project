const { HttpStatusCode } = require("axios");
const appError = require("../utilites/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.currentUser.role)){
            return next()
        } 
    const error = appError.create("you don't have authorization to compelete operation!", 401, HttpStatusCode.FILE);
    return next(error);
    }
};